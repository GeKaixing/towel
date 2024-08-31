<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const dataSource = [
  {
    key: '1',
    name: 'ddddd',
    context: 'desdjcosdnvcj',
    likes: '1',
    comments: '1',
    auth: '正常'
  },
  {
    key: '1',
    name: 'ddddd',
    context: 'desdjcosdnvcj',
    likes: '1',
    comments: '1',
    auth: '正常'
  },

]
const columns = [
  {
    title: '文章标题',
    dataIndex: 'postTitle',
    key: 'postTitle'
  },
  {
    title: '文章内容',
    dataIndex: 'postText',
    key: 'postText'
  },
  {
    title: '点赞',
    dataIndex: 'postLike',
    key: 'postLike'
  },
  {
    title: '评论',
    dataIndex: 'postComment',
    key: 'postComment'
  },
  {
    title: '收藏',
    dataIndex: 'postFavorite',
    key: 'postFavorite'
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' }
  }
]
const resData=ref(null)
onMounted(() => {
  axios.get('http://127.0.0.1:4000/allpostadmin')
  .then(res => {resData.value=res.data})
  .catch(error => console.log(error))
})
const deleteHandler=(dd)=>{
  axios.delete(`http://127.0.0.1:4000/delpostadmin/${dd.value._id}`)
  .then(res => { console.log(res)})
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
    <template #action="{props}">
      <span>
        <a-divider type="vertical" />
        <a @click="deleteHandler(props)">删除</a>
      </span>
    </template>
  </a-table>
</template>
<style scoped></style>
