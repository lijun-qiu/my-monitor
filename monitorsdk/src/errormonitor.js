import {getLastEvent,getSelector,getLines,getSelectors} from './util'
class ErrorMonitor{

  constructor(cb){
    this.cb = cb
  }
  init(){
    const that = this
    that.resourceError()
  }

  resourceError(){
    let that = this
     // 监听全局未捕获错误
     window.addEventListener('error', function (event){

      let lastEvent = getLastEvent(); // 捕获最后一个交互事件（最新标准pointerEvent无法获取path)
      if( event.target && (event.target.src || event.target.href)) {
          // 资源加载错误
          let errorLog = {
              type: 'resourceError', // 资源加载错误
              filename: event.target.src || event.target.href, // 报错文件
              tagName: event.target.tagName, // 标签名
              selector: getSelector(event.target)// 代表最后一个操作的元素
          }
          that.cb(errorLog); // 上报日志
        }else{
            // js加载错误
            let errorLog = {
                type: 'jsError', // 小类型 error错误
                message: event.message, // 报错信息
                filename: event.filename, // 报错文件
                position: `${event.lineno}:${event.colno}`, // 报错位置 行：列
                stack: event.error && getLines(event.error.stack), // 堆栈信息 哪个方法调用哪一块儿
                selector: lastEvent ? getSelector(lastEvent.path) : ""// 代表最后一个操作的元素
            }
            that.cb(errorLog); // 上报日志
        }
    }, true);

     // 捕获promise reject错误
     window.addEventListener('unhandledrejection', (event) => {
      // console.log(event)
        let lastEvent = getLastEvent(); // 获取到最后一个交互事件
        let message;
        let reason = event.reason;
        let lineno = 0;
        let colno = 0;
        let filename;
        let stack;
        if(typeof event.reason === 'string') {
            message = reason;
        }else if(typeof reason === 'object'){
            if(reason.stack){
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                filename = matchResult[1];
                lineno = matchResult[2];
                colno = matchResult[3];
            }
            message = reason.message;
            stack = getLines(reason.stack);
        }
        // promise 报错
        let errorLog = {
            type: 'promiseError',  // pomise错误
            message: message, // 报错信息
            filename: filename, // 报错文件
            position: `${lineno}:${colno}`, // 报错位置 行：列
            stack: stack, // 堆栈信息 哪个方法调用哪一块儿
            selector: lastEvent ? getSelector(lastEvent.path) : ""// 最后一个操作的元素
        }
       that.cb(errorLog)
    }, true)
  }
}


export default ErrorMonitor