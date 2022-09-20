
/**
 * store 托管全局状态
 * 始终存在并且每个人都可以读取和写入的组件
 * state(数据) getters（计算） actions（方法）
 * defineStore定义一个store
 */
 import {defineStore} from 'pinia'
 import {ownMenu} from '@/api/Public.ts'

 //第一个参数是应用程序中store的唯一id
 export const useMenusStore=defineStore("menu",{
     state:()=>({
         menuarr:[],
     }),
     getters:{
         getMenuarr():object[]{
             return this.menuarr
         }
     },
     //actions 可以是异步，可以再其中await任何API的调用
     actions:{
         async getMenus(){
             const themenus=await ownMenu()
             this.menuarr = themenus.data
             return themenus.data
         }
     },
 })