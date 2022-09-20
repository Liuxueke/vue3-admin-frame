<script setup lang="ts">
import headerModule from './header/index.vue'
import menuModule from './menus/index.vue'

import {useRouter} from 'vue-router'
import {watch,ref} from 'vue'
import type {Ref} from 'vue'
const route=useRouter()

let metatitle:Ref<string>=ref('/');
watch(()=>route.currentRoute,(topath:any)=>{
    metatitle.value=topath.value.meta.title
},{immediate:true,deep:true})

</script>

<template>
    <headerModule></headerModule>
    <div class="wrapper">
        <div class="menus">
            <menuModule></menuModule>
        </div>
        <div class="wrapper-content">
            <div class="pageposition padding0-10 flex-center"><el-icon class="mr5 pt2"><LocationInformation /></el-icon>{{metatitle}}</div>
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>
.wrapper{
    position:absolute;left:0;top:50px; right:0;bottom:0; box-sizing:border-box;
    padding-left:200px;
}
.wrapper-content{position: relative; height:100%; box-sizing: border-box;}
.pageposition{height:45px; border-bottom:1px solid #ededed; box-sizing:border-box;}
</style>