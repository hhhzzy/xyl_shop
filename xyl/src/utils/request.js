// http.js
import axios from 'axios'
// import store from '../store'
const url = 'https://www.ysjiancai.cn/web/'; // 正式环境地质
// const url = 'http://localhost:3005/web/'; // 测试环境地质
const ajax = axios.create({
    baseURL: url, // 请求地址
    timeout: 30000 // 请求超时
})
let loginToast = 0;
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // post 的 请求头设置
// 自定义请求
ajax.defaults.adapter = function (config){
    return new Promise((resolve, reject) => {
        // console.log(config)
        // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
        let header = {};
        if(wx.getStorageSync('token')){
            header = {
                'content-type': 'application/json',// 默认值
                'token': `${ wx.getStorageSync('token') }` 
            }
        } else {
            header = {
                'content-type': 'application/json'// 默认值
            }
        }     
        wx.request({
          url:url+config.url,
          method:config.method,
          data:config.data,
          header:header,
          success:(res)=>{ 
              if(res.data.code == -1){
                // mpvue.navigateTo({ 
                //     url: '../authorize/main'
                // })
                loginToast++;
                console.log(loginToast)
                if(loginToast == 1){
                    wx.showModal({
                        title: '提示',
                        content: '为获取更好的服务，请先登录使用！',
                        cancelText:'暂不登录',
                        confirmText:'登录',
                        success: function(res) {
                            if (res.confirm) {
                                mpvue.navigateTo({ 
                                    url: '../authorize/main'
                                })
                            }
                            loginToast = 0;
                        }
                    })
                }
                console.log(1111)  
                // wx.setStorageSync('boolLogin','1');
                // mpvue.switchTab({ 
                //     url: '../mine/main'
                // })
                return resolve(res);
              }else{
                return resolve(res);
              }
          },
          fail:(err)=>{
            return reject(err)
          }
        })
      })
}
// 请求拦截
ajax.interceptors.request.use(config => {
    // 每次请求之前判断vuex中的token是否存在（也可以存在stroge里面）
    // 如果存在，则统一在请求的header中加上token，后台判断是否登录
    // 即使存在token，也有可能过期，所以在响应拦截中也要判断状态
    // const token =  wx.getStorageSync('token');
    // console.log(wx.getStorageSync('token'),'666666')
    // token && (config.headers.Authorization = 'Bearer' + token) // jwt验证
    return config
}, error => {
    return Promise.error(error)
}
)
// 响应拦截
ajax.interceptors.response.use(
    response => {
        return response
    },
    // 状态码提示
    error => {
        wx.hideLoading()
        return Promise.reject(error);
    }
)

export default ajax