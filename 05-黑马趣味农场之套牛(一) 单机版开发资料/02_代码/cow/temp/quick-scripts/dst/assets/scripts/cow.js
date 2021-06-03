
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/cow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3fe7A3z5FIT5NB5blhEDB7', 'cow');
// scripts/cow.js

"use strict";

var cow_skin = cc.Class({
  name: "cow_skin",
  properties: {
    cows: {
      "default": [],
      type: [cc.SpriteFrame]
    }
  }
});
cc.Class({
  "extends": cc.Component,
  properties: {
    cow_sets: {
      "default": [],
      type: [cow_skin]
    }
  },
  onLoad: function onLoad() {
    this.intervalTime = 0; // 随机一种类型

    this.randomType = Math.floor(Math.random() * 3);
  },
  start: function start() {},
  update: function update(dt) {
    // 间隔时间
    this.intervalTime += dt;
    var index = Math.floor(this.intervalTime / 0.2);
    index = index % 3; // 获取一种牛的类型

    var cowSet = this.cow_sets[this.randomType]; // 获取精灵组件

    var sprite = this.node.getComponent(cc.Sprite);
    sprite.spriteFrame = cowSet.cows[index];
  },
  runCallback: function runCallback() {
    cc.log("一个轮回结束！");
    this.randomType = Math.floor(Math.random() * 3);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY293LmpzIl0sIm5hbWVzIjpbImNvd19za2luIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiY293cyIsInR5cGUiLCJTcHJpdGVGcmFtZSIsIkNvbXBvbmVudCIsImNvd19zZXRzIiwib25Mb2FkIiwiaW50ZXJ2YWxUaW1lIiwicmFuZG9tVHlwZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJpbmRleCIsImNvd1NldCIsInNwcml0ZSIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInJ1bkNhbGxiYWNrIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBQyxVQURpQjtBQUV0QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQztBQUNELGlCQUFRLEVBRFA7QUFFREMsTUFBQUEsSUFBSSxFQUFDLENBQUNMLEVBQUUsQ0FBQ00sV0FBSjtBQUZKO0FBREc7QUFGVSxDQUFULENBQWpCO0FBU0FOLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDTyxTQURQO0FBR0xKLEVBQUFBLFVBQVUsRUFBRTtBQUNSSyxJQUFBQSxRQUFRLEVBQUM7QUFDTCxpQkFBUyxFQURKO0FBRUxILE1BQUFBLElBQUksRUFBRSxDQUFDTixRQUFEO0FBRkQ7QUFERCxHQUhQO0FBVUxVLEVBQUFBLE1BVkssb0JBVUs7QUFDTixTQUFLQyxZQUFMLEdBQW9CLENBQXBCLENBRE0sQ0FFTjs7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWMsQ0FBekIsQ0FBbEI7QUFDSCxHQWRJO0FBZ0JMQyxFQUFBQSxLQWhCSyxtQkFnQkksQ0FFUixDQWxCSTtBQXNCTEMsRUFBQUEsTUF0Qkssa0JBc0JHQyxFQXRCSCxFQXNCTztBQUNSO0FBQ0EsU0FBS1AsWUFBTCxJQUFxQk8sRUFBckI7QUFDQSxRQUFJQyxLQUFLLEdBQUdOLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtILFlBQUwsR0FBb0IsR0FBL0IsQ0FBWjtBQUNBUSxJQUFBQSxLQUFLLEdBQUdBLEtBQUssR0FBQyxDQUFkLENBSlEsQ0FLUjs7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBS1gsUUFBTCxDQUFjLEtBQUtHLFVBQW5CLENBQWIsQ0FOUSxDQVFSOztBQUNBLFFBQUlTLE1BQU0sR0FBRyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJ0QixFQUFFLENBQUN1QixNQUExQixDQUFiO0FBQ0FILElBQUFBLE1BQU0sQ0FBQ0ksV0FBUCxHQUFxQkwsTUFBTSxDQUFDZixJQUFQLENBQVljLEtBQVosQ0FBckI7QUFDSCxHQWpDSTtBQWtDTE8sRUFBQUEsV0FsQ0sseUJBa0NTO0FBQ1Z6QixJQUFBQSxFQUFFLENBQUMwQixHQUFILENBQU8sU0FBUDtBQUNBLFNBQUtmLFVBQUwsR0FBa0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBYyxDQUF6QixDQUFsQjtBQUNIO0FBckNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBjb3dfc2tpbiA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6XCJjb3dfc2tpblwiLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNvd3M6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OltdLFxyXG4gICAgICAgICAgICB0eXBlOltjYy5TcHJpdGVGcmFtZV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNvd19zZXRzOntcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjb3dfc2tpbl1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbFRpbWUgPSAwO1xyXG4gICAgICAgIC8vIOmaj+acuuS4gOenjeexu+Wei1xyXG4gICAgICAgIHRoaXMucmFuZG9tVHlwZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIFxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIC8vIOmXtOmalOaXtumXtFxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxUaW1lICs9IGR0O1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IodGhpcy5pbnRlcnZhbFRpbWUgLyAwLjIpO1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXglMztcclxuICAgICAgICAvLyDojrflj5bkuIDnp43niZvnmoTnsbvlnotcclxuICAgICAgICBsZXQgY293U2V0ID0gdGhpcy5jb3dfc2V0c1t0aGlzLnJhbmRvbVR5cGVdO1xyXG5cclxuICAgICAgICAvLyDojrflj5bnsr7ngbXnu4Tku7ZcclxuICAgICAgICBsZXQgc3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGNvd1NldC5jb3dzW2luZGV4XTtcclxuICAgIH0sXHJcbiAgICBydW5DYWxsYmFjaygpIHtcclxuICAgICAgICBjYy5sb2coXCLkuIDkuKrova7lm57nu5PmnZ/vvIFcIik7XHJcbiAgICAgICAgdGhpcy5yYW5kb21UeXBlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xyXG4gICAgfVxyXG59KTtcclxuIl19