"use strict";
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