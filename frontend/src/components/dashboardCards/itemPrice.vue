<template>
  <v-container pa-0 ma-0>
    <div style="display: flex;height:100%">
      <div class="imageTarget" v-if="self.w > 3">
        <v-card-media
          :src="img+opts.targetItem"
          height="75px"
          contain
        ></v-card-media>
      </div>
      <div style="flex-grow: 1">
        <h2>
          <router-link style="color: white" :to="'/item/' + prices.filter(row => row.id === opts.targetItem)[0].id + '/' + prices.filter(row => row.id === opts.targetItem)[0].name">{{prices.filter(row => row.id === opts.targetItem)[0].name}}</router-link>
        </h2>
        <p>overall: {{prices.filter(row => row.id === opts.targetItem)[0].osbOverallText}} gp<br/>
          buy: {{prices.filter(row => row.id === opts.targetItem)[0].osbBuyText}} gp<br/>
        sell: {{prices.filter(row => row.id === opts.targetItem)[0].osbSellText}} gp</p>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'IP',
  props: ['prices', 'img', 'opts', 'self'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imageTarget {
  width:75px;
  min-width:75px;
}
</style>
