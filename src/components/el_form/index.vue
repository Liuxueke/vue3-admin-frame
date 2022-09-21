
<script setup lang="ts">
    import { reactive,watch } from "vue"

    interface Props{
        inline?:boolean //是否行内，默认true
        needSubmit?:boolean //是否需要查询按钮,默认true
        config:any[]
    }
    //withDefaults 为props声明默认值
    const props = withDefaults(defineProps<Props>(),{
        inline: true,
        needSubmit:true
    })
    let formData=reactive({})
    watch(
        ()=>props.config,
        (val)=>{
            val.forEach(vm=>{
                formData[vm.modeForm] = vm.defaultVal
            })
        },
        { immediate:true,deep:true }
    )
</script>
<template>
    <el-form :inline="inline" :model="formData">
        <el-form-item
            v-for="(item,index) in config"
            :key="index"
            :label="item.label"
        >
            <el-select
                v-if="item.type==='select'"
                v-model="formData[item.modeForm]"
                :placeholder="item.placeholder"
                :multiple="item.multiple===undefined?null:item.multiple"
                :collapse-tags="item.multiple===undefined?null:item.multiple"
                :collapse-tags-tooltip="item.multiple===undefined?null:item.multiple"
                :filterable="item.filterable===undefined?null:item.filterable"
            >
                <el-option v-for="vm in item.options" :key="vm.value" :label="vm.name" :value="vm.value" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="needSubmit">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
</template>