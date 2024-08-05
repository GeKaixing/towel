import { open } from "../config"

export const postAi = (context) => {
    return open({ url: `llama`,method:'post',data:{data:{context}}})
 }