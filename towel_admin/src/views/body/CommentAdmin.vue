<script setup lang="ts">
import useDateFormat from '@/hooks/useDateFormat';
import axios from 'axios'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const columns = [
  {
    title: '所属文章id',
    dataIndex: 'postId'
  },
  {
    title: '评论内容',
    dataIndex: 'commentText'
  },
  {
    title: '点赞',
    dataIndex: 'commentLike'
  },
  {
    title: '回复',
    dataIndex: 'reply'
  },
  {
    title: '评论者',
    dataIndex: 'username'
  },
  {
    title: '发布时间',
    dataIndex: 'commentCreateDate'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]
const resData = ref(null)
const reload = ref(false)
const getResDataApi = () => {
  axios
    .get('http://127.0.0.1:4000/allcommentadmin')
    .then((res) => {
      resData.value = res.data
    })
    .catch((error) => console.log(error))
}
onMounted(() => {
  getResDataApi()
})
watch(reload, () => {
  getResDataApi()
})
const deleteHandler = (dd) => {
  axios
    .delete(`http://127.0.0.1:4000/delcommentadmin/${dd._id}`)
    .then(() => {
      reload.value = !reload.value
    })
    .catch((error) => console.log(error))
}

const state = reactive({
  selectedRowKey: [],
  loading: false
})
const hasSelected = computed(() => state.selectedRowKey.length > 0)
const start = () => {
  state.loading = true
  setTimeout(() => {
    state.loading = false
    state.selectedRowKey = []
  }, 1000)
}
</script>
<template>
  <a-button
    type="primary"
    :disabled="!hasSelected"
    :loading="state.loading"
    @click="start"
    class="mb-2"
    >清除选择</a-button
  >
  <a-table
    :dataSource="resData"
    :columns="columns"
    :pagination="{ pageSize: 50 }"
    :rowKey="(record) => record._id"
    :scroll="{ y: 240 }"
    :row-selection="{
      selectedRowKeys: state.selectedRowKey,
      type: 'radio', // 使用复选框
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('Selected Row Keys:', selectedRowKeys) // 调试日志
        console.log('Selected Rows:', selectedRows) // 调试日志
        state.selectedRowKey = selectedRowKeys
      }
    }"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'commentText'">
        <div class="text-ellipsis overflow-hidden text-nowrap w-48">{{ text }}</div>
      </template>
      <template v-if="column.dataIndex === 'commentCreateDate'">
        {{ useDateFormat(text) }}
      </template>
      <template v-if="column.dataIndex === 'action'">
        <a @click="deleteHandler(record)">删除</a>
      </template>
    </template>
  </a-table>
</template>
<style scoped></style>
