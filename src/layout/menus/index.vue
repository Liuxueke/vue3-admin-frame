<script setup lang="ts">
    import {computed} from 'vue'
    import {storeToRefs} from 'pinia'
    import {useMenusStore} from '@/stores/menu.ts'
    /**
     * storeToRefs为任何响应式属性创建refs
     * vue3中ref()接受一个内部值，返回一个响应式的，可更改的ref对象，此对象只有一个指向其内部值的属性.value
     */
    const {menuarr} = storeToRefs(useMenusStore())
    let currentMenu:any=computed(()=>{
        return menuarr.value[0]
    })
</script>

<template>
    <div class="themenu">
        <el-dropdown class="allsystemDrop" trigger="hover">
            <div class="thechoosesys">{{currentMenu.meta.title}}</div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in menuarr" :key="item.system_id">{{item.meta.title}}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-menu
            active-text-color="#07466c"
            background-color="#0a70b0"
            text-color="#fff"
            class="el-menu-vertical-demo"
            router
        >
            <template v-for="item in currentMenu.children">
                <!--二级菜单-->
                <el-sub-menu
                    :key="item.name"
                    :index="item.name"
                    v-if="item.children!==null&&item.children.length>0"
                >
                    <template #title>{{item.meta.title}}</template>
                    <el-menu-item
                        v-for="vm in item.children"
                        :key="vm.name"
                        :index="vm.name"
                        :route="{path:item.path+vm.path}"
                    >
                        {{vm.meta.title}}
                    </el-menu-item>
                </el-sub-menu>
                <!--一级菜单-->
                <el-menu-item
                    :key="item.name"
                    :index="item.name"
                    :route="{path:item.path}"
                    v-else
                >
                    {{item.meta.title}}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style scoped>
.themenu{
    position: absolute; left:0; top:0; bottom:0;
    width: 200px; background-color:#0a70b0;
}
.allsystemDrop{ width:100%; box-sizing: border-box; padding:0 15px;border-bottom:1px solid hsla(0,0%,100%,.3);height: 45px;}
.thechoosesys{ outline:none; line-height:45px; color:#fff; font-size:16px;}
.el-menu{ border:none;}
</style>