const Koa = require('koa')
const app = new Koa();
const { connect, initSchemas } = require('./database/init');
const mongoose = require('mongoose')

let user = require('./appApi/user');
const Router = require('koa-router');

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

/**
 * koa2中解决跨域的中间件叫koa2-cors
 */
const cors = require('koa2-cors');
app.use(cors())

//转载所有子路由
let router = new Router();
router.use('/user', user.routes())

let goods = require('./appApi/goods')
router.use('/goods', goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx) => {
    ctx.body = '<h1>hello Koa2!!!!</h1>'
})

app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})

// 立即执行函数
;
(async() => {
    await connect()
    initSchemas();
    const User = mongoose.model('User');
    let oneUser = new User({ userName: 'jspang' + Math.random().toFixed(5), password: '123456' })
    oneUser.save().then(() => {
        console.log('插入成功')
    })

    let users = await User.findOne({}).exec()
    console.log('-----------------------')
    console.log(users)
    console.log('-----------------------')

})()