import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import LoadImg from './common/images/loading.gif'
import ErrImg from './common/images/errImg.jpg'
import '../src/common/js/rem'
import 'common/css/index.styl'


Vue.use(VueLazyload,{
  error:ErrImg,
  loading:LoadImg,
})

import { 
  Toast,
  Dialog,
  Loading,
  Search,
  Empty,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Field,
  Form,
  Button,
  Cell, 
  CellGroup,
  Uploader,
  Picker,
  Popup,
  AddressList,
  AddressEdit,
  Checkbox,
  Stepper,
  NoticeBar
} from 'vant'

Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Empty)
Vue.use(Search)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Field)
Vue.use(Form)
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(Checkbox)
Vue.use(Stepper)
Vue.use(NoticeBar)

Vue.config.productionTip = false

FastClick.attach(document.body)

FastClick.prototype.focus = function (targetElement) {
  var length
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
