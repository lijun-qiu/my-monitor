import performance from "./performance";
import requestmonitor from './requestmonitor'

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
        console.log(data)
      }).init()
      //测试
      test()
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


new MyMonitor({performanceFlag:true,rquestFlag: true})