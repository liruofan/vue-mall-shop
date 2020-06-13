import Vue from 'vue'
import App from './App.vue'
import Fastclick from 'fastclick'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import LoadImg from './common/images/loading.gif'
import ErrImg from './common/images/errImg.jpg'
import '../src/common/js/rem'
import 'common/css/index.styl'
import { 
  Toast,
  Loading,
  Search,
  Empty,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Field
} from 'vant'

Fastclick.attach(document.body)
Vue.use(VueLazyload,{
  error:ErrImg,
  loading:LoadImg,
})
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Empty)
Vue.use(Search)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Field)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
