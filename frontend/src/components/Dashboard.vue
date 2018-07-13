<template>
  <v-container fluid class="page">
    <muuri-grid id="example-grid">

      <item-md height="100px">
        <v-card><v-card-title><h3>oof1 - </h3></v-card-title><v-card-text>{{priceData.length}}</v-card-text></v-card>
      </item-md>
      <item-md>
        <v-card><v-card-title><h3>oof2</h3></v-card-title></v-card>
      </item-md>
      <item-md height="100px">
        <v-card><v-card-title><h3>oof3</h3></v-card-title></v-card>
      </item-md>
    </muuri-grid>
  </v-container>
</template>

<script>
import { ItemLink, ItemSm, ItemMd, ItemLg } from 'vue-muuri'
export default {
  name: 'HelloWorld',
  data () {
    return {
      source: 'https://noire.io',
      priceData: []
    }
  },
  methods: {
    getData () {
      this.axios.get('/api/allPrices').then(priceData => {
        this.priceData = priceData.data
      }).catch(e => console.log(e))
    }
  },
  created: function () {
    this.getData()
  },
  components: { ItemLink, ItemSm, ItemMd, ItemLg }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
