const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();

// 设置静态资源目录（例如：public文件夹）
app.use(static(__dirname + '/client'));
app.use(static(__dirname + '/node_modules'));

app.listen('3000',()=>{
  console.log('3000 server start')
})