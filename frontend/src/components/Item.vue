<template>
  <v-container fluid class="page">
    <v-layout row wrap>
      <v-flex xs12 md4 pa-2>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs4>
                  <v-icon class="display-3">mdi-clipboard-text</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="text-xs-right">
                  <div class="headline">{{name}}</div>
                  <div class="display-2">{{this.$route.params.id}}</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
      imgPrfx: ''
    }
  },
  methods: {
    updateData () {
      this.loading = true
      this.axios.get('/api/imagePrefix').then(resultData => {
        this.imgPrfx = resultData.data.imagePrefix
        this.axios.get('/api/item/' + this.$route.params.id).then(resData => {
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
          this.loading = false
        }).catch(e => console.log(e))
      }).catch(e => console.log(e))
    }
  },
  mounted: function () {
    this.updateData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
