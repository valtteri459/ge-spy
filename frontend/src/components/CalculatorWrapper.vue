<template>
  <v-container class='page' style="padding: 0px">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <span>Last price update: {{lastUpdate}}</span>
            <v-btn color="primary" style="float: right" small @click="getData() ">Update prices</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-progress-linear :indeterminate="true" v-if="currentlyLoading"></v-progress-linear>
    <div v-if="loaded">
      <transition name="component-fade" mode="out-in">
        <router-view :prices="priceData" :img="imagePrefix"></router-view>
      </transition>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Inventory',
  data () {
    return {
      source: 'https://noire.io',
      currentlyLoading: false,
      priceData: [],
      imagePrefix: '',
      loaded: false,
      lastUpdate: 0
    }
  },
  methods: {
    getData () {
      this.currentlyLoading = true
      this.loaded = false
      this.axios.get('/api/allPrices').then(priceData => {
        this.priceData = priceData.data.map(elem => {
          elem.osbBuyText = elem.osbBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.osbSellText = elem.osbSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.osbOverallText = elem.osbOverall.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.sell_quantityText = elem.sell_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.buy_quantityText = elem.buy_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return elem
        })
        this.lastUpdate = Math.floor(Math.abs(new Date() - priceData.data[0].recordDate) / 1000 / 60) + ' minutes ago'
        this.axios.get('/api/imagePrefix').then(priceData => {
          this.imagePrefix = priceData.data.imagePrefix || ''
          this.loaded = true
          this.currentlyLoading = false
        }).catch(e => {
          console.log(e)
          this.currentlyLoading = false
        })
      }).catch(e => {
        console.log(e)
        this.currentlyLoading = false
      })
    }
  },
  mounted: function () {
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
