
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed6462gOEFMo5nIDdr724Er', 'game');
// scripts/game.js

"use strict";

var httpUtils = require("HttpUtils");

cc.Class({
  "extends": cc.Component,
  properties: {
    rope_node: {
      "default": null,
      type: cc.Node
    },
    cow_ins: {
      "default": null,
      type: cc.Node
    },
    rope_imgs: {
      "default": [],
      type: cc.SpriteFrame
    },
    cow_prefab: {
      "default": null,
      type: cc.Prefab
    },
    time: 0
  },
  onLoad: function onLoad() {
    this.success = false; // 初始分数

    this.scoreNum = 0;
    console.log("微信开发666");
  },
  start: function start() {
    var countDownLabel = cc.find("Canvas/bg_sprite/count_down").getComponent(cc.Label);
    countDownLabel.string = this.time + "s";
    this.schedule(function () {
      this.time--;
      countDownLabel.string = this.time + "s";

      if (this.time == 0) {
        cc.log("游戏结束！"); // 获取弹窗节点

        var resultNode = cc.find("Canvas/result"); // 获取title和content两个节点

        var titleNode = resultNode.getChildByName("title");
        var contentNode = resultNode.getChildByName("content"); // 展示分数

        titleNode.getComponent(cc.Label).string = "最终得分 " + this.scoreNum; // 获取组件

        var contentLabel = contentNode.getComponent(cc.Label);

        switch (true) {
          case this.scoreNum <= 3:
            contentLabel.string = "套牛青铜";
            break;

          case this.scoreNum < 6:
            contentLabel.string = "套牛高手";
            break;

          case this.scoreNum >= 6:
            contentLabel.string = "套牛王者";
            break;
        }

        resultNode.active = true;
        var score = this.scoreNum;
        wx.login({
          success: function success(res) {
            if (res.code) {
              httpUtils.request({
                url: "http://localhost:8080/updateScore",
                method: "POST",
                data: {
                  code: res.code,
                  score: score
                }
              });
              /*  wx.request({
                    url:"http://localhost:8080/updateScore",
                    method: "POST",
                    header: {
                        'content-type':"application/x-www-form-urlencoded"
                    },
                    data:{
                        code:res.code,
                        score:score
                    }
                })*/
            }
          }
        });
        cc.director.pause();
      }
    }, 1);
    var sysInfo = wx.getSystemInfoSync(); // 获取微信界面大小

    var screenWidth = sysInfo.screenWidth;
    var screenHeight = sysInfo.screenHeight; // 创建一个用户授权按钮

    var wxLoginBtn = wx.createUserInfoButton({
      type: "text",
      text: "",
      style: {
        left: 0,
        top: 0,
        width: screenWidth,
        height: screenHeight,
        lineHeight: 40,
        backgroundColor: '#00000000',
        color: '#ffffff'
      }
    });
    var self = this;
    wxLoginBtn.onTap(function (res) {
      console.log(res.userInfo); // 拿到微信用户信息

      var userInfo = res.userInfo;
      self.wxLogin(userInfo);
      wxLoginBtn.destroy();
    });
    wx.getUserInfo({
      success: function success(res) {
        // 拿到用户信息
        var userInfo = res.userInfo;
        self.wxLogin(userInfo);
      },
      fail: function fail() {
        console.log("获取失败");
      }
    }); // 微信广告位

    var bannerAd = wx.createBannerAd({
      adUnitId: "adunit-7d733ad66a23b87b",
      style: {
        left: 27.5,
        top: 80,
        width: 320
      }
    });
    bannerAd.onError(function (err) {
      console.log(err);
    });
    bannerAd.show();
  },
  wxLogin: function wxLogin(userInfo) {
    var icon = cc.find("Canvas/bg_sprite/icon").getComponent(cc.Sprite); // 加载远程网络图片

    cc.loader.load({
      url: userInfo.avatarUrl,
      type: "png"
    }, function (err, texture) {
      icon.spriteFrame = new cc.SpriteFrame(texture);
    });
    wx.login({
      success: function success(res) {
        if (res.code) {
          // 发起网络请求给游戏后台
          httpUtils.request({
            url: "http://localhost:8080/login",
            method: "POST",
            data: {
              code: res.code,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl
            },
            success: function success(msg) {
              console.log(msg);
            }
          });
          /*    wx.request({
                  url:"http://localhost:8080/login",
                  method: "POST",
                  header:{
                      'content-type':'application/x-www-form-urlencoded'
                  },
                  data:{
                      code:res.code,
                      nickName:userInfo.nickName,
                      avatarUrl:userInfo.avatarUrl
                  }
              })*/
        } else {
          console.log("登录失败" + res.errMsg);
        }
      }
    });
  },
  // update (dt) {},

  /**
   *  捕获按钮点击事件
   * @param event
   * @param customEventDate
   */
  clickCapture: function clickCapture(event, customEventDate) {
    this.rope_node.active = true; // 设置绳子在当前父节点的顺序

    this.rope_node.setSiblingIndex(100); // 设置绳子起始位置

    this.rope_node.y = -480; // 向上移动

    var up = cc.moveTo(0.5, this.rope_node.x, 60); // 判定结果

    var result = cc.callFunc(function () {
      // 获取当前牛儿的x点
      var currentX = this.cow_ins.x;

      if (currentX > -100 && currentX < 100) {
        cc.log("捕捉成功！"); // 移除

        var bgNode = this.node.getChildByName("bg_sprite");
        bgNode.removeChild(this.cow_ins); // 获取牛儿的类型

        var ropeType = this.cow_ins.getComponent("cow").randomType + 1;
        this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_imgs[ropeType]; // 生成新的牛节点

        this.cow_ins = cc.instantiate(this.cow_prefab);
        this.cow_ins.y = 0;
        bgNode.addChild(this.cow_ins); //

        this.success = true; // 分数+1

        this.scoreNum++;
      } else {
        cc.log("捕捉失败！");
      }
    }, this); // 往回拉

    var down = cc.moveTo(0.5, this.rope_node.x, -600);
    var finish = cc.callFunc(function () {
      this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_imgs[0]; // 判断是否捕捉成功

      if (this.success == true) {
        var scoreLabel = cc.find("Canvas/bg_sprite/score").getComponent(cc.Label);
        scoreLabel.string = "Score:" + this.scoreNum;
        this.success = false;
      }
    }, this); // 定义一个序列动画

    var sequence = cc.sequence(up, result, down, finish);
    this.rope_node.runAction(sequence);
  },
  // 关闭按钮，继续游戏
  closeBtn: function closeBtn() {
    cc.log("继续游戏");
    cc.director.resume();
    cc.director.loadScene("game");
  },
  // 微信分享
  shareBtn: function shareBtn() {
    wx.shareAppMessage({
      title: "大家都来玩套牛小游戏",
      imageUrl: "http://img.zhubohome.com.cn/game_share.png",
      success: function success(res) {
        console.log(res);
      },
      fail: function fail(res) {
        console.log(res);
      }
    });
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZS5qcyJdLCJuYW1lcyI6WyJodHRwVXRpbHMiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb3BlX25vZGUiLCJ0eXBlIiwiTm9kZSIsImNvd19pbnMiLCJyb3BlX2ltZ3MiLCJTcHJpdGVGcmFtZSIsImNvd19wcmVmYWIiLCJQcmVmYWIiLCJ0aW1lIiwib25Mb2FkIiwic3VjY2VzcyIsInNjb3JlTnVtIiwiY29uc29sZSIsImxvZyIsInN0YXJ0IiwiY291bnREb3duTGFiZWwiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJzY2hlZHVsZSIsInJlc3VsdE5vZGUiLCJ0aXRsZU5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImNvbnRlbnROb2RlIiwiY29udGVudExhYmVsIiwiYWN0aXZlIiwic2NvcmUiLCJ3eCIsImxvZ2luIiwicmVzIiwiY29kZSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJkYXRhIiwiZGlyZWN0b3IiLCJwYXVzZSIsInN5c0luZm8iLCJnZXRTeXN0ZW1JbmZvU3luYyIsInNjcmVlbldpZHRoIiwic2NyZWVuSGVpZ2h0Iiwid3hMb2dpbkJ0biIsImNyZWF0ZVVzZXJJbmZvQnV0dG9uIiwidGV4dCIsInN0eWxlIiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwibGluZUhlaWdodCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwic2VsZiIsIm9uVGFwIiwidXNlckluZm8iLCJ3eExvZ2luIiwiZGVzdHJveSIsImdldFVzZXJJbmZvIiwiZmFpbCIsImJhbm5lckFkIiwiY3JlYXRlQmFubmVyQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJzaG93IiwiaWNvbiIsIlNwcml0ZSIsImxvYWRlciIsImxvYWQiLCJhdmF0YXJVcmwiLCJ0ZXh0dXJlIiwic3ByaXRlRnJhbWUiLCJuaWNrTmFtZSIsIm1zZyIsImVyck1zZyIsImNsaWNrQ2FwdHVyZSIsImV2ZW50IiwiY3VzdG9tRXZlbnREYXRlIiwic2V0U2libGluZ0luZGV4IiwieSIsInVwIiwibW92ZVRvIiwieCIsInJlc3VsdCIsImNhbGxGdW5jIiwiY3VycmVudFgiLCJiZ05vZGUiLCJub2RlIiwicmVtb3ZlQ2hpbGQiLCJyb3BlVHlwZSIsInJhbmRvbVR5cGUiLCJpbnN0YW50aWF0ZSIsImFkZENoaWxkIiwiZG93biIsImZpbmlzaCIsInNjb3JlTGFiZWwiLCJzZXF1ZW5jZSIsInJ1bkFjdGlvbiIsImNsb3NlQnRuIiwicmVzdW1lIiwibG9hZFNjZW5lIiwic2hhcmVCdG4iLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBVSxJQURIO0FBRVBDLE1BQUFBLElBQUksRUFBR0wsRUFBRSxDQUFDTTtBQUZILEtBREg7QUFLUkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0wsaUJBQVMsSUFESjtBQUVMRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGSixLQUxEO0FBVVJFLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFRLEVBREQ7QUFFUEgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNTO0FBRkQsS0FWSDtBQWNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUSxJQURBO0FBRVJMLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVztBQUZBLEtBZEo7QUFrQlJDLElBQUFBLElBQUksRUFBQztBQWxCRyxHQUhQO0FBMEJMQyxFQUFBQSxNQTFCSyxvQkEwQkk7QUFDTCxTQUFLQyxPQUFMLEdBQWUsS0FBZixDQURLLENBRUw7O0FB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QUFaO0FBQ0g7QUFSYyxLQUFuQjtBQVVIO0FBM1JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBodHRwVXRpbHMgPSByZXF1aXJlKFwiSHR0cFV0aWxzXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHJvcGVfbm9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0IDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZSA6IGNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvd19pbnM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJvcGVfaW1nczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb3dfcHJlZmFiOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWU6MFxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAvLyDliJ3lp4vliIbmlbBcclxuICAgICAgICB0aGlzLnNjb3JlTnVtID0gMDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvq7kv6HlvIDlj5E2NjZcIik7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGxldCBjb3VudERvd25MYWJlbCA9IGNjLmZpbmQoXCJDYW52YXMvYmdfc3ByaXRlL2NvdW50X2Rvd25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjb3VudERvd25MYWJlbC5zdHJpbmcgPSB0aGlzLnRpbWUgKyBcInNcIjtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lIC0tO1xyXG4gICAgICAgICAgICBjb3VudERvd25MYWJlbC5zdHJpbmcgPSB0aGlzLnRpbWUgKyBcInNcIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLmuLjmiI/nu5PmnZ/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICAvLyDojrflj5blvLnnqpfoioLngrlcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHROb2RlID0gY2MuZmluZChcIkNhbnZhcy9yZXN1bHRcIik7XHJcbiAgICAgICAgICAgICAgICAvLyDojrflj5Z0aXRsZeWSjGNvbnRlbnTkuKTkuKroioLngrlcclxuICAgICAgICAgICAgICAgIGxldCB0aXRsZU5vZGUgPSByZXN1bHROb2RlLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudE5vZGUgPSByZXN1bHROb2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIOWxleekuuWIhuaVsFxyXG4gICAgICAgICAgICAgICAgdGl0bGVOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLmnIDnu4jlvpfliIYgXCIgKyB0aGlzLnNjb3JlTnVtO1xyXG4gICAgICAgICAgICAgICAgLy8g6I635Y+W57uE5Lu2XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudExhYmVsID0gY29udGVudE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5zY29yZU51bSA8PSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TGFiZWwuc3RyaW5nID0gXCLlpZfniZvpnZLpk5xcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnNjb3JlTnVtIDwgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudExhYmVsLnN0cmluZyA9IFwi5aWX54mb6auY5omLXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5zY29yZU51bSA+PSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50TGFiZWwuc3RyaW5nID0gXCLlpZfniZvnjovogIVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5zY29yZU51bTtcclxuICAgICAgICAgICAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBVdGlscy5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvdXBkYXRlU2NvcmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOnJlcy5jb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZTpzY29yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8qICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvdXBkYXRlU2NvcmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTpyZXMuY29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6c2NvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sMSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgc3lzSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgLy8g6I635Y+W5b6u5L+h55WM6Z2i5aSn5bCPXHJcbiAgICAgICAgbGV0IHNjcmVlbldpZHRoID0gc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICBsZXQgc2NyZWVuSGVpZ2h0ID0gc3lzSW5mby5zY3JlZW5IZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIOWIm+W7uuS4gOS4queUqOaIt+aOiOadg+aMiemSrlxyXG4gICAgICAgIGNvbnN0IHd4TG9naW5CdG4gPSB3eC5jcmVhdGVVc2VySW5mb0J1dHRvbih7XHJcbiAgICAgICAgICAgIHR5cGU6XCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgIHRleHQ6XCJcIixcclxuICAgICAgICAgICAgc3R5bGU6e1xyXG4gICAgICAgICAgICAgICAgbGVmdDowLFxyXG4gICAgICAgICAgICAgICAgdG9wOjAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDpzY3JlZW5XaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDpzY3JlZW5IZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OjQwLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMDAwJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHd4TG9naW5CdG4ub25UYXAoKHJlcykgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy51c2VySW5mbyk7XHJcbiAgICAgICAgICAgLy8g5ou/5Yiw5b6u5L+h55So5oi35L+h5oGvXHJcbiAgICAgICAgICAgIGxldCB1c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgICAgc2VsZi53eExvZ2luKHVzZXJJbmZvKTtcclxuICAgICAgICAgICAgd3hMb2dpbkJ0bi5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmi7/liLDnlKjmiLfkv6Hmga9cclxuICAgICAgICAgICAgICAgIGxldCB1c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgICAgICAgICAgIHNlbGYud3hMb2dpbih1c2VySW5mbyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlvq7kv6Hlub/lkYrkvY1cclxuICAgICAgICBsZXQgYmFubmVyQWQgPSB3eC5jcmVhdGVCYW5uZXJBZCh7XHJcbiAgICAgICAgICAgYWRVbml0SWQ6XCJhZHVuaXQtN2Q3MzNhZDY2YTIzYjg3YlwiLFxyXG4gICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgIGxlZnQgOjI3LjUsXHJcbiAgICAgICAgICAgICAgIHRvcDo4MCxcclxuICAgICAgICAgICAgICAgd2lkdGg6IDMyMFxyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBiYW5uZXJBZC5vbkVycm9yKGVycj0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBiYW5uZXJBZC5zaG93KCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgd3hMb2dpbih1c2VySW5mbykge1xyXG5cclxuICAgICAgICBsZXQgaWNvbiA9IGNjLmZpbmQoXCJDYW52YXMvYmdfc3ByaXRlL2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8g5Yqg6L296L+c56iL572R57uc5Zu+54mHXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWQoe3VybDp1c2VySW5mby5hdmF0YXJVcmwsdHlwZTpcInBuZ1wifSxmdW5jdGlvbiAoZXJyLHRleHR1cmUpIHtcclxuICAgICAgICAgICAgaWNvbi5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Y+R6LW3572R57uc6K+35rGC57uZ5ri45oiP5ZCO5Y+wXHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cFV0aWxzLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvbG9naW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOnJlcy5jb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6dXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6dXNlckluZm8uYXZhdGFyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8qICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6XCJodHRwOi8vbG9jYWxob3N0OjgwODAvbG9naW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTpyZXMuY29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tOYW1lOnVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOnVzZXJJbmZvLmF2YXRhclVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkqL1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueZu+W9leWksei0pVwiKyByZXMuZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICDmjZXojrfmjInpkq7ngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICogQHBhcmFtIGN1c3RvbUV2ZW50RGF0ZVxyXG4gICAgICovXHJcbiAgICBjbGlja0NhcHR1cmU6ZnVuY3Rpb24gKGV2ZW50LGN1c3RvbUV2ZW50RGF0ZSkge1xyXG4gICAgICAgIHRoaXMucm9wZV9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8g6K6+572u57uz5a2Q5Zyo5b2T5YmN54i26IqC54K555qE6aG65bqPXHJcbiAgICAgICAgdGhpcy5yb3BlX25vZGUuc2V0U2libGluZ0luZGV4KDEwMCk7XHJcblxyXG4gICAgICAgIC8vIOiuvue9rue7s+WtkOi1t+Wni+S9jee9rlxyXG4gICAgICAgIHRoaXMucm9wZV9ub2RlLnkgPSAtNDgwO1xyXG4gICAgICAgIC8vIOWQkeS4iuenu+WKqFxyXG4gICAgICAgIGNvbnN0IHVwID0gY2MubW92ZVRvKDAuNSx0aGlzLnJvcGVfbm9kZS54LDYwKTtcclxuXHJcbiAgICAgICAgLy8g5Yik5a6a57uT5p6cXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIOiOt+WPluW9k+WJjeeJm+WEv+eahHjngrlcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRYID0gdGhpcy5jb3dfaW5zLng7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50WCA+IC0xMDAgJiYgY3VycmVudFggPCAxMDApe1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5o2V5o2J5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8g56e76ZmkXHJcbiAgICAgICAgICAgICAgICBsZXQgYmdOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdfc3ByaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgYmdOb2RlLnJlbW92ZUNoaWxkKHRoaXMuY293X2lucyk7XHJcbiAgICAgICAgICAgICAgICAvLyDojrflj5bniZvlhL/nmoTnsbvlnotcclxuICAgICAgICAgICAgICAgIGxldCByb3BlVHlwZSA9IHRoaXMuY293X2lucy5nZXRDb21wb25lbnQoXCJjb3dcIikucmFuZG9tVHlwZSArMTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9wZV9ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb3BlX2ltZ3Nbcm9wZVR5cGVdO1xyXG4gICAgICAgICAgICAgICAgLy8g55Sf5oiQ5paw55qE54mb6IqC54K5XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvd19pbnMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvd19wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3dfaW5zLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgYmdOb2RlLmFkZENoaWxkKHRoaXMuY293X2lucyk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIOWIhuaVsCsxXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlTnVtICsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5o2V5o2J5aSx6LSl77yBXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAvLyDlvoDlm57mi4lcclxuICAgICAgICBsZXQgZG93biA9IGNjLm1vdmVUbygwLjUsdGhpcy5yb3BlX25vZGUueCwtNjAwKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbmlzaCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3BlX25vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvcGVfaW1nc1swXTtcclxuICAgICAgICAgICAgLy8g5Yik5pat5piv5ZCm5o2V5o2J5oiQ5YqfXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICBzY29yZUxhYmVsID0gY2MuZmluZChcIkNhbnZhcy9iZ19zcHJpdGUvc2NvcmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIHNjb3JlTGFiZWwuc3RyaW5nID0gXCJTY29yZTpcIiArIHRoaXMuc2NvcmVOdW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sdGhpcylcclxuXHJcbiAgICAgICAgLy8g5a6a5LmJ5LiA5Liq5bqP5YiX5Yqo55S7XHJcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gY2Muc2VxdWVuY2UodXAscmVzdWx0LGRvd24sZmluaXNoKTtcclxuICAgICAgICB0aGlzLnJvcGVfbm9kZS5ydW5BY3Rpb24oc2VxdWVuY2UpO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWFs+mXreaMiemSru+8jOe7p+e7rea4uOaIj1xyXG4gICAgY2xvc2VCdG4oKSB7XHJcbiAgICAgICAgY2MubG9nKFwi57un57ut5ri45oiPXCIpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOW+ruS/oeWIhuS6q1xyXG4gICAgc2hhcmVCdG4oKSB7XHJcbiAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgdGl0bGUgOiBcIuWkp+WutumDveadpeeOqeWll+eJm+Wwj+a4uOaIj1wiLFxyXG4gICAgICAgICAgICBpbWFnZVVybDogXCJodHRwOi8vaW1nLnpodWJvaG9tZS5jb20uY24vZ2FtZV9zaGFyZS5wbmdcIixcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSk7XHJcbiJdfQ==