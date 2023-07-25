class ElementWhiteScreenMonitor {
  constructor(elementId,cb) {
    this.elementId = elementId
    this.cb = cb
    this.WHITE_SCREEN_THRESHOLD = 3000 // 定义白屏阈值，单位为毫秒
    this.startTime = Date.now()
    
    this.checkElementWhiteScreen = this.checkElementWhiteScreen.bind(this)
    
    window.addEventListener('load', this.checkElementWhiteScreen)
  }
  
  checkElementWhiteScreen() {
    const element = document.getElementById(this.elementId)
    if (element && element.offsetWidth > 0 && element.offsetHeight > 0) {
      const elapsedTime = Date.now() - this.startTime
      if (elapsedTime >= this.WHITE_SCREEN_THRESHOLD) {
        // 在这里执行你的白屏处理逻辑
        this.cb({message:'页面白屏了'})
      }else{
        // 正常
        this.cb({message:'页面正常加载'})
      }
    }else{
      this.cb({message:'顶级父元素请设置id为app'})
    }
  }

  startMonitoring() {
    window.addEventListener('load', this.checkElementWhiteScreen)
  }

  stopMonitoring() {
  	window.removeEventListener('load',this.checkElementWhiteScreen)
	}
}

export default ElementWhiteScreenMonitor;
