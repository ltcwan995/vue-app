<template>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  name:"vChart",
  components: { VeLine },
  data () {
    return {
      chartData: {
        columns: ['date', 'PV'],
        rows: [
          
        ]
      }
    }
  },
  activated(){
      this.chartData.rows=[]
      console.log(this.$route.query.key)
      for(var i=0;i<6;i++){
        this.chartData.rows.push( { 'date': '01-'+i+1, 'PV':i})
      }
      
  }
}
</script>

<style>

</style>