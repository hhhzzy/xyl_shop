// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
// 全局过滤器
Vue.filter('formatDate', (val)=>{
    if(val){
        if(val instanceof Date){
            return val.getFullYear()+'年'+(val.getMonth()+1)+'月'+val.getDate()+'日'
        }else{
            return val.substring(0,10);
        }
    }
})
Vue.filter('formatDateLine', (val)=>{
    if(val){
        if(val instanceof Date){
            return val.getFullYear()+'-'+(val.getMonth()+1)+'-'+val.getDate()
        }else{
            return val.substring(0,10);
        }
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
