import { defineStore } from "pinia"
import {  ref } from "vue"

export const useCounterStore = defineStore('counter', () => {
  const Static = ref(false)

  function Switch() {
    Static.value=!Static.value
  }

  return { Static, Switch }
})
