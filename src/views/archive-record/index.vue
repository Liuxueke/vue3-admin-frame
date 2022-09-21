<script setup lang="ts">
import supTable from '@/components/el_table/index.vue'
import {ref} from 'vue'

let tableColumn=[
    {label:"序号",type:"index",width:60},
    {label:"操作",prop:"opt"},
];
let tableData=[];
let total=ref(0)
function refreshData(val) {
    total.value=val.page_size
}
</script>

<template>
    <!--search-->
    <div class=""></div>
    <!--table-->
    <supTable
        :data="tableData"
        :columns="tableColumn"
        :addClass="'mt10'"
        :totalCount="total"
        @refreshTableData="refreshData"
    >
        <template v-slot:footadd>
            <div>footadd</div>
        </template>
    </supTable>
</template>
