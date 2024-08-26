import { reactive } from "vue";
export const postStore = reactive({
    reload: false,
    replytoreply: null,
    startReload() {
        this.reload = !this.reload
    },
    setReplytoreply(data){
        this.replytoreply=data
        console.log(this.replytoreply)
    },
    deleteReplytoreply(){
        this.replytoreply=null
    }
})