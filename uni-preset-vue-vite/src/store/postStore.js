import { reactive } from "vue";
export const postStore = reactive({
    reload: false,
    replytoreply: null,
    reloadReply: false,
    setReloadReply() {
        this.reloadReply = !this.reloadReply
    },
    startReload() {
        this.reload = !this.reload
    },
    setReplytoreply(data) {
        this.replytoreply = data
    },
    deleteReplytoreply() {
        this.replytoreply = null
    }
})