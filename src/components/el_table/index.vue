<script setup lang="ts">
import {nextTick,watch,ref, computed} from 'vue'
import type {Ref} from 'vue'

const emit=defineEmits<{
    (e:'refreshTableData',params:any):void,
}>()

const props=defineProps<{
    data:any[]
    columns:any[]
    addClass?:string
    tableHeight?:number
    pageSize?:number
    currentPage?:number
    totalCount?:number
}>()

let table_height:Ref<number>=ref(0)//table高度
let paginationCount:Ref<number>=ref(0) //数据总条数
let paginationCurrentPage:Ref<number>=ref(1)
let paginationPageSize:Ref<number>=ref(10)

watch(()=>props.tableHeight,(val)=>{
    if(val){
        table_height.value=val
    }else{
        fitHeight()
    }
},{immediate:true})
watch(
    [
        ()=>props.totalCount
    ],
    ([newcount],[prevcount])=>{
        if(newcount!==prevcount){
            paginationCount.value=newcount
        }
    },
    { immediate:true }
)

function fitHeight(){
    nextTick(()=>{
        let dowheight=window.innerHeight;
        let topoff=document.getElementById("mytable").getBoundingClientRect().top
        table_height.value=dowheight-topoff-50
    })
}
const handleSizeChange=(val:number)=>{
    emit("refreshTableData",{ page_size: val, page_index: 1 })
}
const handleCurrentChange=(val:number)=>{
    emit("refreshTableData",{ page_size: paginationPageSize, page_index: val })
}
</script>

<template>
    <el-table
        :data="data"
        border
        :height="table_height"
        :class="addClass"
        id="mytable"
    >
        <el-table-column
            v-for="(item,index) in columns"
            :key="index"
            :label="item.label"
            :prop="item.prop?item.prop:null"
            :type="item.type?item.type:null"
            :width="item.width?item.width:null"
            show-overflow-tooltip
        ></el-table-column>
        <!--数据为空-->
        <template #empty>
            <div>
                <img src="@/assets/NoData.png"/>
                <p class="f16 color666">暂无数据</p>
            </div>
        </template>
    </el-table>
    <div class="tablebot flex-center justify-between pl10 pr5 borderbox">
        <slot name="footadd"></slot>
        <!--分页-->
        <el-pagination
            background
            layout="total, sizes, prev, pager, next"
            :total="paginationCount"
            v-model:currentPage="paginationCurrentPage"
            v-model:page-size="paginationPageSize"
            :page-sizes="[10, 15, 20, 30, 50, 100, 200]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<style scoped>
.tablebot{ height:50px; width:100%;}
</style>