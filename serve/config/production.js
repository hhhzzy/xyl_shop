/**
 * 上线环境的配置内容
 */

module.exports = {
    env: 'production', //环境名称
    port: 3005,         //服务端口号
    mongodb_url: '127.0.0.1:27017/shop',    //数据库地址
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
}