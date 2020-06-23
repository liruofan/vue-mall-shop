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
import set from 'views/set/set'
import setInfo from 'views/setInfo/setInfo'
import revisename from 'views/revisename/revisename'
import addresslist from 'views/address/addressList'
import addressedit from 'views/address/addressEdit'
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
        },
        children:[
          {
            path:'/profile/set',
            name:'set',
            component:set,
            meta:{
              navfooter:true
            },
            children:[
              {
                path:'/profile/set/setInfo',
                name:'setInfo',
                component:setInfo,
                meta:{
                  navfooter:true
                },
                children:[
                  {
                    path:'/profile/set/setInfo/revisename',
                    name:'revisename',
                    component:revisename,
                    meta:{
                      navfooter:true
                    }
                  },
                  {
                    path:'/profile/set/setInfo/addresslist',
                    name:'addresslist',
                    component:addresslist,
                    meta:{
                      navfooter:true
                    },
                    children:[
                      {
                        path:'/profile/set/setInfo/addressedit',
                        name:'addressedit',
                        component:addressedit,
                        meta:{
                          navfooter:true
                        },
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
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
  if (to.name === 'cart' || to.name === 'profile') {
    if (!localStorage.getItem('token')) {
     return next('/login')
    }
     next()
  }
  next()
})
export default router
