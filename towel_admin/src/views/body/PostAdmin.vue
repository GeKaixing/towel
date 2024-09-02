<script setup>
import axios from 'axios';
import { onMounted, ref,watch} from 'vue';

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
  .then(res => {reload.value=!reload.value })
  .catch(error => console.log(error))
}
</script>
<template>
  <a-table
    :dataSource="resData"
    :columns="columns"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
  >
    <template #bodyCell="{column, text, record }">
      <template v-if="column.dataIndex === 'action'">
           <a @click="deleteHandler(record)">删除</a>
      </template>
    </template>
  </a-table>
</template>
<style scoped></style>
