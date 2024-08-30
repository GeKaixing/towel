<script setup></script>
<template>
    <div>
        
        <table>
            <thead>
                <th>头像</th>
                <th>名字</th>
                <th>邮件</th>
                <th>生日</th>
                <th>权限</th>
                <th colspan="2">操作</th>
            </thead>
            <tr>
                <td>
                    <img src="@/assets/logo.png" class="rounded-full w-10 h-10">
                </td>
                <td> 
                    <div>test</div>
                </td>
                <td> 
                    <div>2890901420@qq.com</div>
                </td>
                <td> 
                    <div>-</div>
                </td>
                <td> 
                    <div>用户</div>
                </td>
                <td> 
                    <div class="cursor-pointer">封禁</div>
                </td>
                <td> 
                    <div class="cursor-pointer">删除</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<style scoped>
table,td,th{
    border: 1px solid black;
    text-align: center;
}

    th{

        width: 100px;
    }
</style>