(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var MyPerformance = /*#__PURE__*/function () {
    function MyPerformance(cb) {
      _classCallCheck(this, MyPerformance);
      this.cb = cb;
      this.performanceData = {};
    }
    _createClass(MyPerformance, [{
      key: "init",
      value: function init() {
        window.addEventListener('load', this.getTimes());
      }
    }, {
      key: "getTimes",
      value: function getTimes() {
        // 获取关键性能指标
        var navigationTiming = performance.getEntriesByType('navigation')[0];
        // 构建性能数据对象
        this.performanceData = {
          // 页面加载时间（从开始导航到页面完全加载完成）
          loadTime: navigationTiming.loadEventEnd - navigationTiming.navigationStart,
          // DNS 查询耗时
          dnsTime: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
          // TCP 连接耗时
          tcpTime: navigationTiming.connectEnd - navigationTiming.connectStart,
          // 发送请求到响应第一个字节耗时（包括服务器响应时间）
          serverResponseTime: navigationTiming.responseStart - navigationTiming.requestStart,
          // 接收响应数据耗时
          dataTransferTime: navigationTiming.responseEnd - navigationTiming.responseStart,
          // DOM 解析耗时
          domParsingTime: performance.timing.domComplete - performance.timing.domInteractive,
          // DOMContentLoaded 事件触发时间（DOM 准备完毕）
          domContentLoadedTime: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          // 页面资源数量
          resourceCount: performance.getEntriesByType('resource').length,
          // 页面资源列表（URL、类型等）
          resourceList: performance.getEntriesByType('resource').map(function (entry) {
            return {
              url: entry.name,
              type: entry.initiatorType
            };
          })
        };
        this.cb(this.performanceData);
      }
    }, {
      key: "sendPerformanceData",
      value: function sendPerformanceData(Data) {
        //提交数据
      }
    }]);
    return MyPerformance;
  }();

  var MyMonitor = /*#__PURE__*/function () {
    function MyMonitor(config) {
      _classCallCheck(this, MyMonitor);
      this.config = config;
      this.init();
    }
    _createClass(MyMonitor, [{
      key: "init",
      value: function init() {
        var performanceFlag = this.config.performanceFlag;
        performanceFlag && new MyPerformance(function (data) {
          console.log(data);
        }).init();
      }
    }]);
    return MyMonitor;
  }();
  new MyMonitor({
    performanceFlag: true
  });

}));
