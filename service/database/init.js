/**
 *  Mongoose 是一个开源的封装好的实现node和MongoDB数据通讯的数据建模库
 */

const mongoose = require('mongoose');
const db = 'mongodb://172.21.12.225:27017/simle-db'



mongoose.Promise = global.Promise
exports.connect = () => {
    //连接数据库
    mongoose.connect(db, {
        retryWrites: false
    });

    let maxConnectTimes = 0;
    /*
     * 必须确保先连接数据库后，再做其他事情，所以在所有代码外层增加一个promise  
     */
    return new Promise((resolve, reject) => {
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected', () => {
                console.log('***********数据库断开**************')
                if (maxConnectTimes < 3) {
                    maxConnectTimes++;
                    //进行重连
                    mongoose.connect(db);
                } else {
                    reject()
                    throw new Error('数据库出现问题，多次连接失败.....')
                }

            })
            //数据库出现错误的时候
        mongoose.connection.on('error', err => {
                console.log('***********数据库错误**************')
                if (maxConnectTimes < 3) {
                    maxConnectTimes++;
                    console.log(err)
                    mongoose.connect(db)
                } else {
                    reject()
                    throw new Error('数据库出现问题，多次连接失败.....')
                }
            })
            //连接打开的时候
        mongoose.connection.on('open', () => {
            console.log('MongoDB connected successfully!')
            resolve()
        })
    })

}

/**
 *  glob:node的glob模块允许使用*等符合，来写一个glob规则，获取匹配对应规则文件
 *  resolve：将一系列路径或路径段解析为绝对路径
 */
const glob = require('glob')
const { resolve } = require('path')
    /**
     * 一次性引入所有的Schema文件：
     * 使用golb.sync同步引入所有的schema文件，然后用forEach的方法require进来
     */
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require);
}