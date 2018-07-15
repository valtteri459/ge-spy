<template>
  <v-container fluid class='page'>
<GridLayout
            :layout="testLayout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="false"
            :vertical-compact="false"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >
        <GridItem v-for="item in testLayout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i">
            <v-card height="100%" class="flexcard">
              <v-card-text class="grow">{{item.i}}</v-card-text>
              <v-card-actions><v-btn flat color="orange" @click="testLayout.splice(testLayout.indexOf(item), 1)">delme</v-btn></v-card-actions>
            </v-card>
        </GridItem>
    </GridLayout>
  </v-container>
</template>

<script>
import grids from 'vue-grid-layout'
var GridLayout = grids.GridLayout
var GridItem = grids.GridItem
export default {
  name: 'HelloWorld',
  data () {
    return {
      source: 'https://noire.io',
      priceData: [],
      testLayout: [
        {'x': 0, 'y': 0, 'w': 4, 'h': 4, 'i': '0'},
        {'x': 2, 'y': 0, 'w': 3, 'h': 4, 'i': '1'},
        {'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2'},
        {'x': 6, 'y': 0, 'w': 2, 'h': 4, 'i': '3'},
        {'x': 8, 'y': 0, 'w': 6, 'h': 4, 'i': '4'},
        {'x': 10, 'y': 0, 'w': 5, 'h': 4, 'i': '5'},
        {'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6'},
        {'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7'},
        {'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8'},
        {'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9'},
        {'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10'},
        {'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11'},
        {'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12'},
        {'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13'},
        {'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14'},
        {'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15'},
        {'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16'},
        {'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '17'},
        {'x': 0, 'y': 9, 'w': 2, 'h': 4, 'i': '18'},
        {'x': 2, 'y': 6, 'w': 2, 'h': 8, 'i': '19'}
      ]
    }
  },
  methods: {
    getData () {
      this.axios.get('/api/allPrices').then(priceData => {
        this.priceData = priceData.data
      }).catch(e => console.log(e))
    },
    updateOrder (items) {
      console.log(items)
    }
  },
  created: function () {
    this.getData()
  },
  components: {
    GridLayout,
    GridItem
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
