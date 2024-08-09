import { defineStore } from "pinia";
import { ref } from 'vue';
export const useloginStore = defineStore("login", ()=>{
    const loginState=ref(null)
    return{
        loginState
    }
});