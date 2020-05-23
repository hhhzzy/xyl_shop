const mongoose = require("mongoose")
//引入配置文件
var config = require('../config');
const DB_URL = "mongodb://" + config.mongodb_url;
/**
 * 使用 Node 自带 Promise 代替 mongoose 的 Promise
 */
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useNewUrlParser: true }).catch( err => {
    console.log(err)
} );
//连接成功
mongoose.connection.on("connected", () => {
    console.log("mongodb数据库连接成功")
});
//连接异常
mongoose.connection.on("error", (error) => {
    console.log("mongodb数据库连接失败", error)
});
//连接断开
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});
module.exports = mongoose;