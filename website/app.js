const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();
const cors = require('koa2-cors'); // 引入 koa2-cors 模块

// 设置静态资源目录（例如：public文件夹）
app.use(static(__dirname + '/client'));
app.use(static(__dirname + '/node_modules'));
// 使用 koa2-cors 中间件来处理跨域请求
app.use(cors());

//测试xhr feach
// 自测接口路由
app.use(async (ctx) => {
  if (ctx.path === '/data') {
    // 模拟处理逻辑，可以根据需求进行修改
    const data = {
      message: 'Hello, world!',
      timestamp: Date.now()
    };

    ctx.body = data
  } else {
    ctx.status = 404 // 非 /data 路径返回 404 错误
  }
})

app.listen('3000',()=>{
  console.log('3000 server start')
})