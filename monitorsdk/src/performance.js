
class MyPerformance{
  constructor(cb){
    this.cb = cb
    this.performanceData = {}
    this.timer = null
    this.check = this.check.bind(this)
    this.p = performance.timing
  }
  init(){
    window.addEventListener('load',this.check)
  }
  check(){
    if(this.p.loadEventEnd){
      //加载完成
      this.timer && clearTimeout(this.timer)
      this.cb(this.getTimes())
    }else{
      //未加载完成
      this.timer = setTimeout(this.check,100)
    }
  }
  getTimes(){
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
    resourceList: performance.getEntriesByType('resource')
      .map(entry => ({
        url: entry.name,
        type: entry.initiatorType,
        requestTime: entry.responseEnd - entry.responseStart
      }))
    }
   return this.performanceData
  }
  sendPerformanceData(Data){
    //提交数据
  }
}

export default MyPerformance
