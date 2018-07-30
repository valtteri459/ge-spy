<template>
  <v-container fluid class='page' style="padding: 0px">
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h2>Personal dashboard
            <v-btn color="success" style="float: right" @click="saveLayout()">Save layout</v-btn>
            <v-btn color="primary" style="float: right" @click="newWidget = true">Add widget</v-btn>
            <v-btn color="primary" style="float: right" @click="getData() ">Update prices</v-btn>
            </h2>
            <span>Last price update: {{lastUpdate}}</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-progress-linear :indeterminate="true" v-if="currentlyLoading"></v-progress-linear>
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
          <v-card-text class="grow">
            <div style="display: flex">
              <div style="flex-grow: 1">
                <component v-bind:is="item.element" :prices="priceData" :img="imagePrefix" :opts="item.opts"></component>
              </div>
              <div style="max-width:45px" class="closebtn">
                <v-btn flat small left style="min-width: 0" title="delete">x</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </GridItem>
    </GridLayout>
    <v-dialog v-model="newWidget" max-width="750px">
      <v-card>
        <v-card-title>
          Add widget
        </v-card-title>
        <v-card-text>
          <v-autocomplete :items="registeredWidgets" v-model="widgetName" label="Widget type"></v-autocomplete>
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

import priceGraph from './dashboardCards/priceGraph'
import priceGraphForm from './dashboardCards/priceGraphForm'

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
      lastUpdate: 'Unknown',
      widgetOpts: null,
      currentlyLoading: false,
      dashboardSaved: false,
      registeredWidgets: [
        {text: 'Item price', value: 'itemPriceForm'},
        {text: 'Profitability calculator', value: 'profitabilityCalcForm'},
        {text: 'Price chart', value: 'priceGraphForm'}
      ],
      loaded: false,
      testLayout: [
        {'x': 0, 'y': 0, 'w': 2, 'h': 4, 'i': '1', 'element': 'itemPrice', 'opts': {targetItem: 20997}},
        {'x': 0, 'y': 0, 'w': 2, 'h': 4, 'i': '2', 'element': 'itemPrice', 'opts': {targetItem: 2}}
      ]
    }
  },
  methods: {
    getData () {
      this.currentlyLoading = true
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
          if (localStorage.getItem('dashboard')) {
            this.testLayout = JSON.parse(localStorage.getItem('dashboard'))
          }
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
    profitabilityCalcForm,
    priceGraph,
    priceGraphForm
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
