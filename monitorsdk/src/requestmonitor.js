class RequestMonitor {
  constructor(cb) {this.cb = cb}

  init(){
    this.monitorXHR()
    this.monitorFetch()
  }

  monitorXHR() {
    const that = this
    const open = window.XMLHttpRequest.prototype.open
    window.XMLHttpRequest.prototype.open = function(method, url) {
      this._url = url // 记录请求的 URL
      this._method = method
      return open.apply(this, arguments)
    }

    const send = window.XMLHttpRequest.prototype.send
    window.XMLHttpRequest.prototype.send = function() {
      const startTime = new Date().getTime() // 记录请求开始时间

      this.addEventListener('load', function() {
        // 请求完成时的处理逻辑
        const responseTime = new Date().getTime() - startTime // 计算响应时间

        const data = {
          type: 'XHR Request',
          url: this._url,
          method: this._method,
          status: this.status,
          responseTime: responseTime + 'ms',
          responseText:this.responseText
        }
        that.cb(data)
      })

      return send.apply(this, arguments)
    }
  }

  monitorFetch() {
    const that = this
    const originalFetch = window.fetch
    window.fetch = function(url, options) {
      const startTime = new Date().getTime() // 记录请求开始时间

      return originalFetch(url, options)
        .then(function(response) {
          // 请求完成时的处理逻辑
          const responseTime = new Date().getTime() - startTime // 计算响应时间

          const data = {
            type: 'Fetch Request',
            url: url,
            method: options && options.method || 'GET',
            status: response.status,
            responseTime: responseTime + 'ms',
            responseText:response.responseText
          }
          that.cb(data)
          return response
        })
    }
  }
}

export default RequestMonitor