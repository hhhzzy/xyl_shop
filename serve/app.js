const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt');
const koaBody = require('koa-body');
const path = require('path');

// 添加格式化处理响应结果的中间件，在添加路由之前调用
const response_formatter = require('./middlewares/response_formatter');
// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
// 下面以koa2-cors为例，
const cors = require('koa2-cors');
// 路由
const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(koaBody({
    multipart: true,
    formidable:{
        uploadDir:path.join(__dirname,'public/uploads/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file)=>{	// 文件存储之前对文件进行重命名处理
            const fileFormat = file.name.split('.');
            file.name = `${Date.now()}.${fileFormat[fileFormat.length-1]}`
            file.path = `public/uploads/${file.name}`;
        }
    }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 使用koa2-cors ,设置跨域
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/api') {
        //     return "*"; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 
        return "*"
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// jwt 验证
// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
              ctx.body = '没有权限访问该接口！\n';
        }else{
            throw err;
        }
    })
})
// 设置需要身份验证的页面
app.use(koajwt({
    secret: 'hzy_token'
}).unless({
    path: [/\/api\/users\/register/,/\/upload/, /\/web/, /\/api\/users\/login/] // 首页,后台 login和register页面，前端页面不用验证
}));

// 添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(response_formatter('^/api'));
// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
