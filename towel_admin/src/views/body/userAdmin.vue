<script setup>
const dataSource=[
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            email: '2890901420@qq.com',
             auth:'正常'
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            email: '2890901420@qq.com',
            auth:'正常'
          },
          
        ]
const  columns=[
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '邮件',
            dataIndex: 'email',
            key: 'email',
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
</script>
<template>
    <a-table :dataSource="dataSource" :columns="columns"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }" >
        <template #action="{  }">
            <span>
              <a-divider type="vertical" />
              <a>禁言</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                封禁
                <down-outlined />
              </a>
            </span>
          </template>
    </a-table>
</template>
<style scoped>
</style>