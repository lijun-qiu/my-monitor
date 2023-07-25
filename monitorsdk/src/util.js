export const getLastEvent = function(){
      // 获取最后一个操作的事件
      let lastEvent;
      ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
          document.addEventListener(eventType, (event) => {
                  lastEvent = event;
                  // html5之前使用mouseEvent.path等获取事件位置，
                  // html5之后所有事件使用 PointerEven 替代，取消path
              }, {
                  capture: true, // 捕获阶段执行 防止事件丢失
                  passive: true, // 默认不阻止默认事件
              })
      });
}
export const getSelector = function(pathsOrTarget){
  if (Array.isArray(pathsOrTarget)) {
      return getSelectors(pathsOrTarget);
  } else {
        let path = [];
        while (pathsOrTarget) {
            path.push(pathsOrTarget);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return getSelectors(path);
    }
}

export const getLines = function(stack){
  return stack && stack.split('\n').slice(1).map(item=>item.replace(/^\s+at\s+/g, "")).join('^');
}

export const getSelectors = function (path) {
  // 反转 + 过滤 + 映射 + 拼接
  return path
      .reverse()
      .filter((element) => {
          return element !== document && element !== window;
      })
      .map((element) => {
          // console.log("element", element.nodeName);
          let selector = "";
          if (element.id) {
              return `${element.nodeName.toLowerCase()}#${element.id}`;
          } else if (element.className && typeof element.className === "string") {
              return `${element.nodeName.toLowerCase()}.${element.className}`;
          } else {
              selector = element.nodeName.toLowerCase();
          }
          return selector;
      })
      .join(" ");
}