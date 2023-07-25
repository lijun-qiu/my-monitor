import performance from "./performance";

class MyMonitor{
  constructor(config){
    this.config = config
    this.init()
  }
  init(){
    //性能监控
    const {performanceFlag} = this.config
    performanceFlag && new performance((data)=>{
      console.log(data)
    }).init()

    //xhr feach监控
    
  }
}


new MyMonitor({performanceFlag:true})