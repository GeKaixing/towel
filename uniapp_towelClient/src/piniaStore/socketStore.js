import io from '@hyoga/uni-socket.io';
import { defineStore } from "pinia";
import { ref } from 'vue';
export const useSocketStore = defineStore("socketStore", () => {
    let socketInstance=ref(null)
    let sockeData=ref([])
    const getSocketInstance = () => {
        if (!socketInstance.value) {
            // 初始化 Socket.IO 实例
            socketInstance.value= io('http://127.0.0.1:4000', {
                query: {
                    userid: uni.getStorageSync('userid'),
                },
                transports: ['websocket', 'polling'],
            });
        }
        return socketInstance.value;
    }
    const connect=()=>{
        getSocketInstance().on("connect", () => { 
            console.log(`Socket connected with id: ${socketInstance.value.id}`);
        }); 
        getSocketInstance().on(`${uni.getStorageSync('userid')}`, (res) => {
            sockeData.value=res.data
        });
    }
    return{
        sockeData,
        connect,
        getSocketInstance,
        socketInstance,
    }
})