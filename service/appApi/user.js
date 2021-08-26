const Router = require('koa-router')
let router = new Router();
const mongoose = require('mongoose')
router.get('/', async(ctx) => {
    ctx.body = '这是用户操作首页'
})
router.post('/register', async(ctx) => {
    //取得Model
    const User = mongoose.model('User');
    //把前端接收的post数据封装成一个新的user对象
    let newUser = new User(ctx.request.body);
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(() => {
        //成功返回code=200
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})
router.post('/login', async(ctx) => {
    let loginUser = ctx.request.body;
    let userName = loginUser.userName
    let password = loginUser.password

    //取得Model
    const User = mongoose.model('User');
    await User.findOne({ userName: userName }).exec().then(async(result) => {
        if (result) {
            let newUser = new User();
            if (password === result.password) {
                //成功返回code=200
                ctx.body = {
                    code: 200,
                    message: true
                }
            } else {
                ctx.body = {
                    code: 500,
                    message: false
                }
            }
        } else {

            ctx.body = {
                code: 200,
                message: '用户名不存在'
            }
        }

    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})
module.exports = router