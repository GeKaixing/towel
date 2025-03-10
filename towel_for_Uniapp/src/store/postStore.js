import { reactive } from "vue";
export const postStore = reactive({
    reload: false,
    replytoreply: null,
    reloadComment: false,
    reloadReply: false,
    setReloadComment() {
        this.reloadComment = !this.reloadComment
    },
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