import { reactive } from "vue";
export const postStore = reactive({
    reload:false,
    startReload(){
        this.reload=!this.reload
}
})