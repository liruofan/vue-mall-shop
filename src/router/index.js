import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('../views/index')
const home = () => import('../views/home/home')
const category = () => import('../views/category/category')
const cart = () => import('../views/cart/cart')
const profile = () => import('../views/profile/profile')
import searchDetail from 'views/searchDetail/searchDetail'
import goodlist from 'views/goods/goodlist'
import goodDetail from 'views/goods/goodDetail'
import login from 'views/login/login'
import register from 'views/register/register'
Vue.use(VueRouter)

  const routes = [
  {
    path:'/index',
    component:Index,
    children: [
      {
        path:'/category',
        name:'category',
        component:category,
        meta:{
          navfooter:true
        },
        children:[
          {
            path:'/category/goodlist',
            name:'goodlist',
            component:goodlist,
            meta:{
              navfooter:true
            },
            children:[
              { 
                path:'/category/goodlist/gooddetail',
                name:'gooddetail',
                component:goodDetail,
                meta:{
                  navfooter:true
                }
              }
            ]
          }
        ]
      },{
        path:'/cart',
        name:'cart',
        component:cart,
        meta:{
          navfooter:true
        }
      },{
        path:'/profile',
        name:'profile',
        component:profile,
        meta:{
          navfooter:true
        }
      },{
        path: '/home',
        name:'home',
        component: home,
        meta:{
          navfooter:true
        },
        children:[
          {
            path:'/home/search',
            name:"search",
            component:searchDetail,
            meta:{
              navfooter:true
            }
          }
        ]
      },
      {
        path:'/login',
        name:'login',
        component:login
      },
      {
        path:'/register',
        name:'register',
        component:register
      }
    ]
  },{
    path:'/',
    redirect:'/home'
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if (to.path === '/cart' || to.path === '/profile') {
    if (!localStorage.getItem('token')) {
      next('/login')
    }else{
      next()
    }
  }
  next()
})
export default router
