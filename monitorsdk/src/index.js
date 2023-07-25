import performance from "./performance";
import requestmonitor from './requestmonitor'
import ErrorMonitor from "./errormonitor";
import ElementWhiteScreenMonitor from './blankscreen.js';

class MyMonitor{
  constructor(config){
    this.config = config
    this.init()
  }
  async init(){
    //性能监控
    const {performanceFlag} = this.config
    performanceFlag && new performance((data)=>{
      //数据处理
      // console.log(data)
    }).init()

    //xhr feach监控
    if(this.config.rquestFlag){
      new requestmonitor((data)=>{
        // console.log(data)
      }).init()
      //测试
      // test()
    }

    //js错误监控
    if(this.config.errorFlag){
      new ErrorMonitor((data)=>{
        // console.log(data)
      }).init()
    }
    //白屏监控
    if(this.config.blankScreenFlag){
      // 创建监控实例并传入需要监测的元素 ID
      const WhiteScreen = new ElementWhiteScreenMonitor('app',(data)=>{
        console.log(data)
      }); 

      // 启动白屏监测
      WhiteScreen.startMonitoring();

      // 停止白屏监测
      // WhiteScreen.stopMonitoring();
    }
  }
}

const test = ()=>{
  // 示例使用：
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:3000/data')
  xhr.send()

  fetch('http://localhost:3000/data')
    .then(function(response) {
    // 处理响应
  })
}


new MyMonitor({performanceFlag:true,rquestFlag: true,errorFlag: true,blankScreenFlag: true})