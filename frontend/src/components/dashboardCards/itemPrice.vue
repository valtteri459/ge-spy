<template>
  <v-container pa-0 ma-0>
    <v-layout pa-0 ma-0>
      <v-flex>
        <v-card-media
          :src="img+opts.targetItem"
          height="75px"
          contain
        ></v-card-media>
      </v-flex>
      <v-flex>
        <h2>{{prices.filter(row => row.id === opts.targetItem)[0].name}}</h2>
        <p>buy: {{prices.filter(row => row.id === opts.targetItem)[0].osbBuyText}} gp<br/>
        sell: {{prices.filter(row => row.id === opts.targetItem)[0].osbSellText}} gp</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Inventory',
  props: ['prices', 'img', 'opts'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
