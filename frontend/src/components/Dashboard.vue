<template>
  <v-container fluid class="page">
    <muuri-grid id="example-grid">
      <div id="ooffie" class="item"
        :style="{
          'width': '100%',
          'max-width': '300px'
        }" v-for="item in [1,2,3,4,5,6,7,8,9,0]" :key="item">
        <div class="item-content item-md">
          <v-card><v-card-title><h3>oof - {{item}}</h3></v-card-title><v-card-text>{{priceData.length}}</v-card-text></v-card>
        </div>
      </div>
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
