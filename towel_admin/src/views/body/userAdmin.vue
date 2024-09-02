<script setup>
import axios from 'axios';
import { onMounted, ref,watch } from 'vue';
const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '生日',
    dataIndex: 'birthday',
  },
  {
    title: '邮件',
    dataIndex: 'email',
  },
  {
    title: '电话',
    dataIndex: 'phoneNumber',
  },
  {
    title: '权限',
    dataIndex: 'auth',
  },
  {
    title: 'action',
    dataIndex:'action',
  },
]
const resData=ref(null)
const reload=ref(false)
const reloadHandler=()=>{
  reload.value=!reload.value
}
/* const deleteHandler = (dd) => {
  axios.delete(`http://127.0.0.1:4000/deleteuser/${dd._id}`)
  .then(res => { reloadHandler()})
  .catch(error => console.log(error))
} */
const banHandler = (dd) => {
  axios.post(`http://127.0.0.1:4000/banuser/${dd._id}`)
  .then(res => { reloadHandler()})
  .catch(error => console.log(error))

}
const sealingHandler = (dd) => {
  axios.post(`http://127.0.0.1:4000/sealinguser/${dd._id}`)
  .then(res => { reloadHandler()})
  .catch(error => console.log(error))

}
const getResDataApi=()=>{
  axios.get('http://127.0.0.1:4000/alluser')
  .then(res => { resData.value=res.data})
  .catch(error => console.log(error))
}
onMounted(() => {
  getResDataApi()
})
watch(resData,()=>{
  getResDataApi()
})
</script>
<template>
  <a-table :dataSource="resData" :columns="columns" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }">
    <template #bodyCell="{column, text, record }">
    <template v-if="column.dataIndex === 'action'">
      <span>
        <!-- <a @click="deleteHandler(record)">删除</a> -->
        <a @click="banHandler(record)">禁言</a>
        <a  @click="sealingHandler(record)" class="ant-dropdown-link">
          封禁
          <down-outlined />
        </a>
      </span>
    </template>
    </template>
  </a-table>
</template>
<style scoped></style>