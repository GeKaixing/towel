<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    email: '2890901420@qq.com',
    auth: '正常'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    email: '2890901420@qq.com',
    auth: '正常'
  },

]
const columns = [
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    key: 'birthday',
  },
  {
    title: '邮件',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '电话',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: '权限',
    dataIndex: 'auth',
    key: 'auth',
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
  },
]

const deleteHandler = (dd) => {
  axios.delete(`http://127.0.0.1:4000/deleteuser/${dd.value._id}`)
  .then(res => { console.log(res)})
  .catch(error => console.log(error))

}
const banHandler = (dd) => {
  axios.post(`http://127.0.0.1:4000/banuser/${dd.value._id}`)
  .then(res => { console.log(res)})
  .catch(error => console.log(error))

}
const sealingHandler = (dd) => {
  axios.post(`http://127.0.0.1:4000/sealinguser/${dd.value._id}`)
  .then(res => { console.log(res)})
  .catch(error => console.log(error))

}
const resData=ref(null)
onMounted(() => {
  axios.get('http://127.0.0.1:4000/alluser')
  .then(res => { resData.value=res.data})
  .catch(error => console.log(error))
})
</script>
<template>
  <a-table :dataSource="resData" :columns="columns" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }">
    <template #action="Props">
      <span>
        <a-divider type="vertical" />
        <a @click="deleteHandler(Props)">删除</a>
        <a-divider type="vertical" />
        <a @click="banHandler(Props)">禁言</a>
        <a-divider type="vertical" />
        <a  @click="sealingHandler(Props)" class="ant-dropdown-link">
          封禁
          <down-outlined />
        </a>
      </span>
    </template>
  </a-table>
</template>
<style scoped></style>