const mongoose = require('mongoose') //
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId

//创建用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createAt: { type: Date, default: Date.now() },
    lastLoginAt: { type: Date, default: Date.now() }
}, {
    collection: 'user' //不设置时，库里的会变成users
})

mongoose.set('useCreateIndex', true);
//发布模型
mongoose.model('User', userSchema);