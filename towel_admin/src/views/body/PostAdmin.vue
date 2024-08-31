<script setup>
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
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '文章内容',
    dataIndex: 'context',
    key: 'context'
  },
  {
    title: '点赞',
    dataIndex: 'likes',
    key: 'likes'
  },
  {
    title: '评论',
    dataIndex: 'comments',
    key: 'comments'
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' }
  }
]
</script>
<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="{ pageSize: 50 }"
    :scroll="{ y: 240 }"
  >
    <template #action="{}">
      <span>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    </template>
  </a-table>
</template>
<style scoped></style>
