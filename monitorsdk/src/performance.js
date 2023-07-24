
class MyPerformance{
  constructor(cb){
    this.cb = cb
    this.performanceData = {}
  }
  init(){
    window.addEventListener('load',this.getTimes())
  }
  getTimes(){
    // 获取关键性能指标
    const navigationTiming = performance.getEntriesByType('navigation')[0]
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
    resourceList: performance.getEntriesByType('resource')
      .map(entry => ({
        url: entry.name,
        type: entry.initiatorType
      }))
    }
    this.cb(this.performanceData)
  }
  sendPerformanceData(Data){
    //提交数据
  }
}

export default MyPerformance
