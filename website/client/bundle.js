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
      this.timer = null;
      this.check = this.check.bind(this);
      this.p = performance.timing;
    }
    _createClass(MyPerformance, [{
      key: "init",
      value: function init() {
        window.addEventListener('load', this.check);
      }
    }, {
      key: "check",
      value: function check() {
        if (this.p.loadEventEnd) {
          //加载完成
          this.timer && clearTimeout(this.timer);
          this.cb(this.getTimes());
        } else {
          //未加载完成
          this.timer = setTimeout(this.check, 100);
        }
      }
    }, {
      key: "getTimes",
      value: function getTimes() {
        // 构建性能数据对象
        this.performanceData = {
          // 从请求到响应时长
          sendTime: this.p.responseEnd - this.p.requestStart,
          // 首字节收到的时长
          ttfbTime: this.p.responseStart - this.p.navigationStart,
          // 白屏
          whiteScreen: this.p.domLoading - this.p.navigationStart,
          // 页面加载时间（从开始导航到页面完全加载完成）
          loadTime: this.p.loadEventEnd - this.p.loadEventStart,
          // DNS 查询耗时
          dnsTime: this.p.domainLookupEnd - this.p.domainLookupStart,
          // TCP 连接耗时
          tcpTime: this.p.connectEnd - this.p.connectStart,
          // 发送请求到响应第一个字节耗时（包括服务器响应时间）
          serverResponseTime: this.p.responseStart - this.p.requestStart,
          // 接收响应数据耗时
          dataTransferTime: this.p.responseEnd - this.p.responseStart,
          // DOM 解析耗时
          domParsingTime: this.p.domComplete - this.p.domLoading,
          // DOMContentLoaded 事件触发时间（DOM 准备完毕）
          domContentLoadedTime: this.p.domContentLoadedEventEnd - this.p.navigationStart,
          // onload执行时长
          onloadTime: this.p.loadEventEnd - this.p.loadEventStart,
          // 总时长
          totleTime: this.p.loadEventEnd - this.p.navigationStart,
          // 页面资源数量
          resourceCount: performance.getEntriesByType('resource').length,
          // 页面资源列表（URL、类型等）
          resourceList: performance.getEntriesByType('resource').map(function (entry) {
            return {
              url: entry.name,
              type: entry.initiatorType,
              requestTime: entry.responseEnd - entry.responseStart
            };
          })
        };
        return this.performanceData;
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
        //性能监控
        var performanceFlag = this.config.performanceFlag;
        performanceFlag && new MyPerformance(function (data) {
          console.log(data);
        }).init();

        //xhr feach监控
      }
    }]);
    return MyMonitor;
  }();
  new MyMonitor({
    performanceFlag: true
  });

}));
