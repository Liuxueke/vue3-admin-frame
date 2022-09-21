import { createRouter, createWebHistory } from 'vue-router'
import { useMenusStore } from '../stores/menu.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        title:"首页",
        keepAlive:true,
      },
      component: ()=>import("@/layout/index.vue"),
      children:[
        {
          path:'archive-record',
          name:'datasearch',
          meta:{
            title:"记录查询"
          },
          component: ()=>import("@/views/archive-record/index.vue")
        }
      ]
    },
  ]
})

router.beforeEach(async(to,from)=>{
  const menus=useMenusStore()
  const themenu = await menus.getMenus() //获取调用菜单接口，获取菜单
})

export default router
