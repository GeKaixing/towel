<script>
import {sockeConnect}from './socket/socket.js'
export default {
  onLaunch: function () {
    sockeConnect()
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
*{
  box-sizing: border-box;
}
</style>
