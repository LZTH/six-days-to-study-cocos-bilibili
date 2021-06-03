
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/HttpUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '77c8fOWP8BDZY0NPX7QnWeV', 'HttpUtils');
// scripts/HttpUtils.js

"use strict";

var HttpUtils = /*#__PURE__*/function () {
  function HttpUtils() {}

  var _proto = HttpUtils.prototype;

  _proto.request = function request(option) {
    if (String(option) !== '[object Object]') return undefined;
    option.method = option.method ? option.method.toUpperCase() : 'GET';
    option.data = option.data || {};
    var formData = [];

    for (var key in option.data) {
      formData.push(''.concat(key, '=', option.data[key]));
    }

    option.data = formData.join('&');

    if (option.method === 'GET') {
      option.url += location.search.length === 0 ? ''.concat('?', option.data) : ''.concat('&', option.data);
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = option.responseType || 'json';

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (option.success && typeof option.success === 'function') {
            option.success(xhr.response);
          }
        } else {
          if (option.error && typeof option.error === 'function') {
            option.error();
          }
        }
      }
    };

    xhr.open(option.method, option.url, true);

    if (option.method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.send(option.method === 'POST' ? option.data : null);
  };

  return HttpUtils;
}();

module.exports = new HttpUtils();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcSHR0cFV0aWxzLmpzIl0sIm5hbWVzIjpbIkh0dHBVdGlscyIsInJlcXVlc3QiLCJvcHRpb24iLCJTdHJpbmciLCJ1bmRlZmluZWQiLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImRhdGEiLCJmb3JtRGF0YSIsImtleSIsInB1c2giLCJjb25jYXQiLCJqb2luIiwidXJsIiwibG9jYXRpb24iLCJzZWFyY2giLCJsZW5ndGgiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJlcnJvciIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BOzs7OztTQUNGQyxVQUFBLGlCQUFRQyxNQUFSLEVBQWdCO0FBQ1osUUFBSUMsTUFBTSxDQUFDRCxNQUFELENBQU4sS0FBbUIsaUJBQXZCLEVBQTBDLE9BQU9FLFNBQVA7QUFDMUNGLElBQUFBLE1BQU0sQ0FBQ0csTUFBUCxHQUFnQkgsTUFBTSxDQUFDRyxNQUFQLEdBQWdCSCxNQUFNLENBQUNHLE1BQVAsQ0FBY0MsV0FBZCxFQUFoQixHQUE4QyxLQUE5RDtBQUNBSixJQUFBQSxNQUFNLENBQUNLLElBQVAsR0FBY0wsTUFBTSxDQUFDSyxJQUFQLElBQWUsRUFBN0I7QUFDQSxRQUFJQyxRQUFRLEdBQUcsRUFBZjs7QUFDQSxTQUFLLElBQUlDLEdBQVQsSUFBZ0JQLE1BQU0sQ0FBQ0ssSUFBdkIsRUFBNkI7QUFDekJDLE1BQUFBLFFBQVEsQ0FBQ0UsSUFBVCxDQUFjLEdBQUdDLE1BQUgsQ0FBVUYsR0FBVixFQUFlLEdBQWYsRUFBb0JQLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZRSxHQUFaLENBQXBCLENBQWQ7QUFDSDs7QUFDRFAsSUFBQUEsTUFBTSxDQUFDSyxJQUFQLEdBQWNDLFFBQVEsQ0FBQ0ksSUFBVCxDQUFjLEdBQWQsQ0FBZDs7QUFFQSxRQUFJVixNQUFNLENBQUNHLE1BQVAsS0FBa0IsS0FBdEIsRUFBNkI7QUFDekJILE1BQUFBLE1BQU0sQ0FBQ1csR0FBUCxJQUFjQyxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLE1BQWhCLEtBQTJCLENBQTNCLEdBQStCLEdBQUdMLE1BQUgsQ0FBVSxHQUFWLEVBQWVULE1BQU0sQ0FBQ0ssSUFBdEIsQ0FBL0IsR0FBNkQsR0FBR0ksTUFBSCxDQUFVLEdBQVYsRUFBZVQsTUFBTSxDQUFDSyxJQUF0QixDQUEzRTtBQUNIOztBQUVELFFBQUlVLEdBQUcsR0FBRyxJQUFJQyxjQUFKLEVBQVY7QUFDQUQsSUFBQUEsR0FBRyxDQUFDRSxZQUFKLEdBQW1CakIsTUFBTSxDQUFDaUIsWUFBUCxJQUF1QixNQUExQzs7QUFDQUYsSUFBQUEsR0FBRyxDQUFDRyxrQkFBSixHQUF5QixZQUFZO0FBQ2pDLFVBQUlILEdBQUcsQ0FBQ0ksVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN0QixZQUFJSixHQUFHLENBQUNLLE1BQUosS0FBZSxHQUFuQixFQUF3QjtBQUNwQixjQUFJcEIsTUFBTSxDQUFDcUIsT0FBUCxJQUFrQixPQUFPckIsTUFBTSxDQUFDcUIsT0FBZCxLQUEwQixVQUFoRCxFQUE0RDtBQUN4RHJCLFlBQUFBLE1BQU0sQ0FBQ3FCLE9BQVAsQ0FBZU4sR0FBRyxDQUFDTyxRQUFuQjtBQUNIO0FBQ0osU0FKRCxNQUlPO0FBQ0gsY0FBSXRCLE1BQU0sQ0FBQ3VCLEtBQVAsSUFBZ0IsT0FBT3ZCLE1BQU0sQ0FBQ3VCLEtBQWQsS0FBd0IsVUFBNUMsRUFBd0Q7QUFDcER2QixZQUFBQSxNQUFNLENBQUN1QixLQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0osS0FaRDs7QUFhQVIsSUFBQUEsR0FBRyxDQUFDUyxJQUFKLENBQVN4QixNQUFNLENBQUNHLE1BQWhCLEVBQXdCSCxNQUFNLENBQUNXLEdBQS9CLEVBQW9DLElBQXBDOztBQUNBLFFBQUlYLE1BQU0sQ0FBQ0csTUFBUCxLQUFrQixNQUF0QixFQUE4QjtBQUMxQlksTUFBQUEsR0FBRyxDQUFDVSxnQkFBSixDQUFxQixjQUFyQixFQUFxQyxtQ0FBckM7QUFDSDs7QUFDRFYsSUFBQUEsR0FBRyxDQUFDVyxJQUFKLENBQVMxQixNQUFNLENBQUNHLE1BQVAsS0FBa0IsTUFBbEIsR0FBMkJILE1BQU0sQ0FBQ0ssSUFBbEMsR0FBeUMsSUFBbEQ7QUFDSDs7Ozs7QUFFTHNCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixJQUFJOUIsU0FBSixFQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSHR0cFV0aWxzIHtcclxuICAgIHJlcXVlc3Qob3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKFN0cmluZyhvcHRpb24pICE9PSAnW29iamVjdCBPYmplY3RdJykgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIG9wdGlvbi5tZXRob2QgPSBvcHRpb24ubWV0aG9kID8gb3B0aW9uLm1ldGhvZC50b1VwcGVyQ2FzZSgpIDogJ0dFVCdcclxuICAgICAgICBvcHRpb24uZGF0YSA9IG9wdGlvbi5kYXRhIHx8IHt9XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gW11cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9uLmRhdGEpIHtcclxuICAgICAgICAgICAgZm9ybURhdGEucHVzaCgnJy5jb25jYXQoa2V5LCAnPScsIG9wdGlvbi5kYXRhW2tleV0pKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24uZGF0YSA9IGZvcm1EYXRhLmpvaW4oJyYnKVxyXG5cclxuICAgICAgICBpZiAob3B0aW9uLm1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgICAgICAgb3B0aW9uLnVybCArPSBsb2NhdGlvbi5zZWFyY2gubGVuZ3RoID09PSAwID8gJycuY29uY2F0KCc/Jywgb3B0aW9uLmRhdGEpIDogJycuY29uY2F0KCcmJywgb3B0aW9uLmRhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9uLnJlc3BvbnNlVHlwZSB8fCAnanNvbidcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnN1Y2Nlc3MgJiYgdHlwZW9mIG9wdGlvbi5zdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zdWNjZXNzKHhoci5yZXNwb25zZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24uZXJyb3IgJiYgdHlwZW9mIG9wdGlvbi5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24uZXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIub3BlbihvcHRpb24ubWV0aG9kLCBvcHRpb24udXJsLCB0cnVlKVxyXG4gICAgICAgIGlmIChvcHRpb24ubWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIuc2VuZChvcHRpb24ubWV0aG9kID09PSAnUE9TVCcgPyBvcHRpb24uZGF0YSA6IG51bGwpXHJcbiAgICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgSHR0cFV0aWxzKCk7Il19