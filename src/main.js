import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast/index.js'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
	store
}).$mount('#app')

// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用图片懒加载
Vue.use(VueLazyLoad,{
	// 此处可添加占位图
	loading:require('./assets/img/common/placeholder.png')
})