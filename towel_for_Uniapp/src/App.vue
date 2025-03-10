<script>
import { sockeConnect, socketInstance } from "./socket/socket.js";
import{ messageStore} from './store/messageStore.js/'
const localStorageData =
  uni.getStorageSync("logindata") &&
  JSON.parse(uni.getStorageSync("logindata"));
export default {
  onLaunch: function () {
    sockeConnect();
    socketInstance.on(`${localStorageData.userid}`, (data) => {
      messageStore.setmessage(data.datas)
    });
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
