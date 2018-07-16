<template>
  <v-container fluid class='page' style="padding: 0px">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h2>Personal dashboard
            <v-btn color="success" style="float: right" @click="saveLayout()">Save layout</v-btn>
            <v-btn color="primary" style="float: right" @click="newWidget = true">Add widget</v-btn>
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
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      v-if="loaded">
      <GridItem v-for="item in testLayout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        style="overflow: hidden">
        <v-card height="100%" class="flexcard">
          <v-card-text class="grow"><component v-bind:is="item.element" :prices="priceData" :img="imagePrefix" :opts="item.opts"></component></v-card-text>
          <v-card-actions><v-btn flat color="orange" @click="testLayout.splice(testLayout.indexOf(item), 1)">Remove</v-btn></v-card-actions>
        </v-card>
      </GridItem>
    </GridLayout>
    <v-dialog v-model="newWidget" max-width="750px">
      <v-card>
        <v-card-title>
          Add widget
        </v-card-title>
        <v-card-text>
          <v-autocomplete :items="registeredWidgets" v-model="widgetName" label="widget type"></v-autocomplete>
          <component v-bind:is="widgetName" :prices="priceData" :img="imagePrefix" v-model="widgetOpts"></component>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addWidget()">Add</v-btn><v-spacer></v-spacer><v-btn color="primary" flat @click.stop="widgetName = '';widgetOpts = null;newWidget = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="dashboardSaved" color="success" :timeout="3000">Dashboard saved!<v-btn
        dark
        flat
        @click="dashboardSaved = false"
      >
        Close
      </v-btn></v-snackbar>
  </v-container>
</template>

<script>
import grids from 'vue-grid-layout'

import itemPrice from './dashboardCards/itemPrice'
import itemPriceForm from './dashboardCards/itemPriceForm'

import profitabilityCalc from './dashboardCards/profitabilityCalc'
import profitabilityCalcForm from './dashboardCards/profitabilityCalcForm'

var GridLayout = grids.GridLayout
var GridItem = grids.GridItem
export default {
  name: 'Dashboard',
  data () {
    return {
      imagePrefix: '',
      priceData: [],
      newWidget: false,
      widgetName: null,
      widgetOpts: null,
      dashboardSaved: false,
      registeredWidgets: [{text: 'item price', value: 'itemPriceForm'}, {text: 'profitability calculator', value: 'profitabilityCalcForm'}],
      loaded: false,
      testLayout: [
        {'x': 0, 'y': 0, 'w': 2, 'h': 4, 'i': '1', 'element': 'itemPrice', 'opts': {targetItem: 20997}},
        {'x': 0, 'y': 0, 'w': 2, 'h': 4, 'i': '2', 'element': 'itemPrice', 'opts': {targetItem: 2}}
      ]
    }
  },
  methods: {
    getData () {
      this.axios.get('/api/allPrices').then(priceData => {
        this.priceData = priceData.data.map(elem => {
          elem.osbBuyText = elem.osbBuy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.osbSellText = elem.osbSell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.osbOverallText = elem.osbOverall.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.sell_quantityText = elem.sell_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          elem.buy_quantityText = elem.buy_quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          return elem
        })
        this.axios.get('/api/imagePrefix').then(priceData => {
          this.imagePrefix = priceData.data.imagePrefix || ''
          if (localStorage.getItem('dashboard')) {
            this.testLayout = JSON.parse(localStorage.getItem('dashboard'))
          }
          this.loaded = true
        }).catch(e => console.log(e))
      }).catch(e => console.log(e))
    },
    addWidget () {
      this.testLayout.push(this.widgetOpts)
      this.widgetName = null
      this.widgetOpts = null
      this.newWidget = false
    },
    saveLayout () {
      localStorage.setItem('dashboard', JSON.stringify(this.testLayout))
      this.dashboardSaved = true
    }
  },
  created: function () {
    this.getData()
  },
  components: {
    GridLayout,
    GridItem,
    itemPrice,
    itemPriceForm,
    profitabilityCalc,
    profitabilityCalcForm
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
