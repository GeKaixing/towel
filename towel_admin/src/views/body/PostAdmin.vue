<script setup>
import axios from 'axios';
import { computed, onMounted, reactive, ref,watch} from 'vue';

const columns = [
  {
    title: '文章标题',
    dataIndex: 'postTitle',
  },
  {
    title: '文章内容',
    dataIndex: 'postText',
  },
  {
    title: '点赞',
    dataIndex: 'postLike',
  },
  {
    title: '评论',
    dataIndex: 'postComment',

  },
  {
    title: '收藏',
    dataIndex: 'postFavorite',
  },
  {
    title: '操作',
    dataIndex: 'action',

  }
]
const resData=ref(null)
const reload=ref(false)
const getResDataApi=()=>{
  axios.get('http://127.0.0.1:4000/allpostadmin')
  .then(res => {resData.value=res.data})
  .catch(error => console.log(error))
}
onMounted(() => {
  getResDataApi()
})
watch(reload,()=>{
  getResDataApi()
})
const deleteHandler=(dd)=>{
  axios.delete(`http://127.0.0.1:4000/delpostadmin/${dd._id}`)
  .then(() => {reload.value=!reload.value })
  .catch(error => console.log(error))
}

const state = reactive({
  selectedRowKey: [],
  // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKey.length > 0);
const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKey = [];
  }, 1000);
};
</script>
<template>
  <a-button type="primary" :disabled="!hasSelected"  :loading="state.loading" @click="start">清除选择</a-button>
  <a-table
    :dataSource="resData"
    :columns="columns"
    :pagination="{ pageSize: 50 }"
    :rowKey="(record) => record._id"
    :scroll="{ y: 240 }"
    :row-selection="{
      selectedRowKeys: state.selectedRowKey,
      type: 'radio', // 使用复选框
      hideDefaultSelections: true,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('Selected Row Keys:', selectedRowKeys) // 调试日志
        console.log('Selected Rows:', selectedRows) // 调试日志
        state.selectedRowKey = selectedRowKeys
      }
      }"
  >
    <template #bodyCell="{column, record }">
      <template v-if="column.dataIndex === 'action'">
           <a @click="deleteHandler(record)">删除</a>
      </template>
    </template>
  </a-table>
</template>
<style scoped></style>
