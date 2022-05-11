import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 格式化css

// 按需导Vant组件
import {
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Lazyload,
  Button,
  Cell,
  CellGroup,
  NavBar,
  Toast,
  Field,
  Form,
  List
} from 'vant'
// 注册全局组件
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Form)
Vue.use(List)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
