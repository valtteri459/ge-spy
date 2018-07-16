<template>
  <v-container fluid class='page' style="padding: 0px">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h2>Personal dashboard
            <v-btn color="primary" style="float: right" @click="newVidget = true">Add widget</v-btn>
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <GridLayout
      style="margin:24px"
      :layout="testLayout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true">
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
    <v-dialog v-model="newVidget" max-width="500px">
      <v-card>
        <v-card-title>
          Lisää laite
        </v-card-title>
        <v-card-text>
          <v-text-field name='type' label='Laitteen tyyppi' v-model="testoTusti"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary">Tallenna</v-btn><v-spacer></v-spacer><v-btn color="primary" flat @click.stop="newVidget=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import grids from 'vue-grid-layout'
var GridLayout = grids.GridLayout
var GridItem = grids.GridItem
export default {
  name: 'Dashboard',
  data () {
    return {
      priceData: [],
      newVidget: false,
      testoTusti: '',
      testLayout: [
        {'x': 0, 'y': 0, 'w': 12, 'h': 4, 'i': '0'}
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
