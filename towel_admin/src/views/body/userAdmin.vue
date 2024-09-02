<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
const columns = [
  {
    title: '姓名',
    dataIndex: 'username'
  },
  {
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '邮件',
    dataIndex: 'email'
  },
  {
    title: '电话',
    dataIndex: 'phoneNumber'
  },
  {
    title: '权限',
    dataIndex: 'auth'
  },
  {
    title: '状态',
    dataIndex: 'state'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]
const resData = ref(null)
const reload = ref(false)
const reloadHandler = () => {
  reload.value = !reload.value
}
/* const deleteHandler = (dd) => {
  axios.delete(`http://127.0.0.1:4000/deleteuser/${dd._id}`)
  .then(res => { reloadHandler()})
  .catch(error => console.log(error))
} */
const banHandler = (dd) => {
  axios
    .post(`http://127.0.0.1:4000/banuser/${dd._id}`)
    .then(() => {
      reloadHandler()
    })
    .catch((error) => console.log(error))
}
const offBanHandler = (dd) => {
  axios
    .post(`http://127.0.0.1:4000/offbanuser/${dd._id}`)
    .then(() => {
      reloadHandler()
    })
    .catch((error) => console.log(error))
}
const sealingHandler = (dd) => {
  axios
    .post(`http://127.0.0.1:4000/sealinguser/${dd._id}`)
    .then(() => {
      reloadHandler()
    })
    .catch((error) => console.log(error))
}
const offSealingHandler = (dd) => {
  axios
    .post(`http://127.0.0.1:4000/offsealinguser/${dd._id}`)
    .then(() => {
      reloadHandler()
    })
    .catch((error) => console.log(error))
}
const getResDataApi = () => {
  axios
    .get('http://127.0.0.1:4000/alluser')
    .then((res) => {
      resData.value = res.data
    })
    .catch((error) => console.log(error))
}
onMounted(() => {
  getResDataApi()
})
watch(resData, () => {
  getResDataApi()
})
// const rowSelection = 

</script>
<template>
  <a-table
    :dataSource="resData"
    :columns="columns"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'state'">
        <!-- <a @click="deleteHandler(record)">删除</a> -->
        <div class="flex space-x-2">
          <div v-if="record.ban">禁言</div>
          <div v-else>-</div>
          <div v-if="record.sealing">封禁</div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'action'">
        <!-- <a @click="deleteHandler(record)">删除</a> -->
        <div class="flex space-x-2">
          <a v-if="!record.ban" @click="banHandler(record)">禁言</a>
          <a v-else @click="offBanHandler(record)">取消禁言</a>
          <a v-if="!record.sealing" @click="sealingHandler(record)"> 封禁</a>
          <a v-else @click="offSealingHandler(record)">取消禁言</a>
        </div>
      </template>
    </template>
  </a-table>
</template>
<style scoped></style>
