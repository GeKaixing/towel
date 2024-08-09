export default function useLocaStorage() {
    const  getLocaStorageData=()=>{
        const getLocaStorageData =localStorage.getItem('userData')
        let userData=JSON.parse(getLocaStorageData)
        return userData||{}
    }
    const setLocaStorageData=(userData={})=>{
        const userDatas=JSON.stringify(userData)
       localStorage.setItem('userData',userDatas)
    }
return {getLocaStorageData,setLocaStorageData}
}