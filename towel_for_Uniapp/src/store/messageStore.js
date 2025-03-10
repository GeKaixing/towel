import { reactive } from "vue";
export const messageStore = reactive({
    message: null,
    setmessage(data) {
        this.replytoreply = data
    }
})