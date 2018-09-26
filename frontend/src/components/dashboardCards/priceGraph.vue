<template>
  <v-container pa-0 ma-0 style="width:100%;height:100%;overflow:hidden">
    <div style="display: flex;height:100%">
      <div style="flex:1 1 auto;min-width:0;max-width:100%;padding:1px;display:flex;flex-direction:column">
        <h2>
          {{opts.duration}} day price of <router-link style="color: white" :to="'/item/' + prices.filter(row => row.id === opts.item)[0].id + '/' + prices.filter(row => row.id === opts.item)[0].name">{{prices.filter(row => row.id === opts.item)[0].name}}</router-link>
        </h2>
        <div id="catcher" style="flex-grow:1;display:flex;flex-direction:column">
          <itemPriceGraph :datas="graphData" :loading="loading" :hidehead="true" style="flex-grow:1"></itemPriceGraph>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import itemPriceGraph from '../utility/itemPriceGraph'
export default {
  name: 'pGraphWidget',
  props: ['prices', 'img', 'opts'],
  data () {
    return {
      loading: true,
      graphData: [],
      graphDataOriginal: []
    }
  },
  mounted: function () {
    // this.opts.item
    // this.opts.duration
    this.updateData()
  },
  methods: {
    updateData () {
      this.loading = true
      var fetchStartDate = new Date()
      fetchStartDate.setDate(fetchStartDate.getDate() - this.opts.duration)
      this.axios.get('/api/itemHistory/' + this.opts.item + '/' + fetchStartDate.getTime()).then(graphData => {
        this.graphData = [ ...graphData.data ]
        this.graphDataOriginal = [ ...graphData.data ]
        this.loading = false
      }).catch(e => console.log(e))
    }
  },
  components: {
    itemPriceGraph
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #catcher{
  min-width:0;
   max-width:100%;
   max-height:100%;
  overflow:hidden;
 }
 * {
   box-sizing: border-box;
 }
</style>
