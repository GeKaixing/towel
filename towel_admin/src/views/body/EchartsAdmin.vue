<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const echartsDom = ref(null)
onMounted(() => {
  const myChart = echarts.init(echartsDom.value)
  myChart.setOption({
    title: {
      text: 'towel 文章'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: "数量",
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
<template>
  <div id="echrts" class="w-[400px] h-[600px]" ref="echartsDom"></div>
</template>
<style></style>
