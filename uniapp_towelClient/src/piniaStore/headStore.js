import { defineStore } from "pinia";
import { ref } from 'vue'
export const useHeadStore = defineStore('head', () => {
    // 输入框输入数据
    const fliterDataStore = ref(null)
    // 输入框状态
    const inputState = ref(true)
    // 
    // 输入框输入数据 函数
    const alterFliterDataStore = (targetData) => {
        fliterDataStore.value = targetData
    }
    return {
        fliterDataStore,
        inputState,
        alterFliterDataStore
    }
}
)