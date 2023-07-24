import performance from "./performance";

class MyMonitor{
  constructor(config){
    this.config = config
    this.init()
  }
  init(){
    const {performanceFlag} = this.config
    performanceFlag && new performance((data)=>{
      console.log(data)
    }).init()
  }
}


new MyMonitor({performanceFlag:true})