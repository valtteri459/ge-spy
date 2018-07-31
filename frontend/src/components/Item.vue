<template>
  <v-container class='page'>
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <v-card>
            <v-card-title><h1 class='.font-weight-medium .display-3' mr-2>{{name}}</h1><v-spacer></v-spacer><span>item ID: {{$route.params.id}}</span></v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 pa-2>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs2>
                <v-card-media
                  :src='imgPrfx + $route.params.id'
                  height='125px'
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs10>
                <h1>Statistics</h1>
                <h4 class='grey--text'>updated {{Math.floor(Math.abs(new Date() - this.timeStamp)/1000/60)}} minutes ago</h4>
                  <table style='width:100%'>
                    <tr>
                      <td><b>Current price:</b></td><td>{{osbOverall.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>Trade volume (3h):</b></td><td>{{(buy_quantity + sell_quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>Sell price:</b></td><td>{{osbSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>Buying quantity(3h):</b></td><td>{{buy_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>Buy price:</b></td><td>{{osbBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>Sell quantity(3h):</b></td><td>{{sell_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>Store price:</b></td><td>{{storePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td><b>GE limit:</b></td><td>{{geLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</td>
                    </tr>
                    <tr>
                      <td><b>High alchemy:</b></td><td>{{Math.floor(0.6*storePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} gp</td>
                      <td></td><td></td>
                    </tr>
                  </table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 pa-2>
        <h4>Graph time</h4>
        <v-btn color="primary" @click="setWeek()" :disabled="selected === 1">Week</v-btn>
        <v-btn color="primary" @click="setTwoWeeks()" :disabled="selected === 2">2 Weeks</v-btn>
        <v-btn color="primary" @click="setMonth()" :disabled="selected === 3">Month</v-btn>
      </v-flex>
      <v-flex xs12 pa-2>
        <itemPriceGraph :datas="graphData" :loading="loading"></itemPriceGraph>
      </v-flex>
      <v-flex xs12 pa-2>
        <itemTradeGraph :datas="graphData" :loading="loading"></itemTradeGraph>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import limits from '@/assets/limits.js'
import itemPriceGraph from './utility/itemPriceGraph'
import itemTradeGraph from './utility/itemTradeGraph'
export default {
  name: 'item',
  data () {
    return {
      loading: true,
      name: '',
      members: false,
      storePrice: 0,
      timeStamp: 0,
      osbOverall: 0,
      osbBuy: 0,
      osbSell: 0,
      buy_quantity: 0,
      sell_quantity: 0,
      imgPrfx: '',
      geLimit: 0,
      graphData: [],
      graphDataOriginal: [],
      selected: 3
    }
  },
  methods: {
    setWeek () {
      var fetchStartDate = new Date()
      fetchStartDate.setDate(fetchStartDate.getDate() - 7)
      fetchStartDate = fetchStartDate.getTime()
      this.graphData = this.graphDataOriginal.filter(elem => elem.timeStamp > fetchStartDate)
      this.selected = 1
    },
    setTwoWeeks () {
      var fetchStartDate = new Date()
      fetchStartDate.setDate(fetchStartDate.getDate() - 14)
      fetchStartDate = fetchStartDate.getTime()
      this.graphData = this.graphDataOriginal.filter(elem => elem.timeStamp > fetchStartDate)
      this.selected = 2
    },
    setMonth () {
      this.graphData = [ ...this.graphDataOriginal ]
      this.selected = 3
    },
    updateData () {
      this.loading = true
      this.axios.get('/api/imagePrefix').then(resultData => {
        this.imgPrfx = resultData.data.imagePrefix
        this.axios.get('/api/item/' + this.$route.params.id).then(resData => {
          var fetchStartDate = new Date()
          fetchStartDate.setDate(fetchStartDate.getDate() - 30)
          this.axios.get('/api/itemHistory/' + this.$route.params.id + '/' + fetchStartDate.getTime()).then(graphData => {
            var elem = resData.data
            this.name = elem.name
            this.member = elem.members === 1
            this.storePrice = elem.storePrice
            this.timeStamp = elem.timeStamp
            this.osbOverall = elem.osbOverall
            this.osbBuy = elem.osbBuy
            this.osbSell = elem.osbSell
            this.buy_quantity = elem.buy_quantity
            this.sell_quantity = elem.sell_quantity
            var limitSearch = limits.filter(filterRow => filterRow.item === elem.name)[0]
            this.geLimit = limitSearch ? limitSearch.limit : 'Unknown'
            this.graphData = [ ...graphData.data ]
            this.graphDataOriginal = [ ...graphData.data ]
            this.loading = false
          }).catch(e => console.log(e))
        }).catch(e => console.log(e))
      }).catch(e => console.log(e))
    }
  },
  mounted: function () {
    this.updateData()
    document.title = this.$route.params.name + ' - GE spy'
  },
  destroyed: function () {
    document.title = 'GE spy'
  },
  components: {
    itemPriceGraph,
    itemTradeGraph
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
