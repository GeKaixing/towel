import io from '@hyoga/uni-socket.io';
export let socketInstance;

const localStorageData =  uni.getStorageSync('logindata')&&JSON.parse(uni.getStorageSync('logindata'))
export const socke=()=>{
     socketInstance= io('http://127.0.0.1:4000', {
        query: {
            userid: localStorageData.userid,
        },
        transports: ['websocket', 'polling'],
    });
    return socketInstance;
}
socke()
export const sockeConnect=()=>{
    socketInstance.on("connect", () => { 
        console.log(`Socket connected with id: ${socketInstance.id}`);
    }); 
} 