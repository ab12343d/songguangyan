// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 安装 目录 引入 挂袋跟实例上
import store from './store'

// 引入样式清空
import './assets/css/reset.css'

// 引入过滤器
import './filters'

//引入公共组件
import './components'

// 引入vue组件
import './pages/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
