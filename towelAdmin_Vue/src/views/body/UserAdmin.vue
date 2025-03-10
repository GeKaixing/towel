<script setup lang="ts">
import useDateFormat from '@/hooks/useDateFormat';
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'

const columns = [
  { title: '姓名', dataIndex: 'username' },
  { title: '生日', dataIndex: 'birthday' },
  { title: '邮件', dataIndex: 'email' },
  { title: '电话', dataIndex: 'phoneNumber' },
  { title: '权限', dataIndex: 'auth' },
  { title: '状态', dataIndex: 'state' },
  { title: '创建时间', dataIndex: 'CreateDate' },
  { title: '操作', dataIndex: 'action' }
]

const resData = ref(null)
const reload = ref(false)
const reloadHandler = () => {
  reload.value = !reload.value
}

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

<a-button type="primary" :disabled="!hasSelected"  :loading="state.loading" @click="start" class="mb-2">清除选择</a-button>
  <a-table
    :dataSource="resData"
    :columns="columns"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
    :rowKey="(record) => record._id"
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
    <template #bodyCell="{ column,text, record }">
      <template v-if="column.dataIndex === 'state'">
        <div class="flex space-x-2">
          <div v-if="record.ban">禁言</div>
          <div v-else>-</div>
          <div v-if="record.sealing">封禁</div>
        </div>
      </template>
    <template v-if="column.dataIndex === 'CreateDate'">
      {{ useDateFormat(text)}}
    </template>
      <template v-if="column.dataIndex === 'action'">
        <div class="flex space-x-2">
          <a v-if="!record.ban" @click="banHandler(record)">禁言</a>
          <a v-else @click="offBanHandler(record)">取消禁言</a>
          <a v-if="!record.sealing" @click="sealingHandler(record)">封禁</a>
          <a v-else @click="offSealingHandler(record)">取消封禁</a>
        </div>
      </template>
    </template>
  </a-table>
</template>

<style scoped></style>
