<template>
  <v-layout row wrap>
    <v-flex xs12 pa-2>
      <h4>Nature rune price: {{prices.filter(row => row.id === 561)[0].osbOverallText}} gp</h4>
      <v-card>
        <v-card-title>
          High alch profitability
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="osrsItems"
          :search="search"
          v-bind:pagination.sync="pagination"
        >
          <template slot="items" slot-scope="props">
            <td><router-link style="color: white" :to="'/item/' + props.item.id + '/' + props.item.name">{{ props.item.name }}</router-link></td>
            <td class="text-xs-right">{{ formatNum(props.item.HAPrice) }} gp</td>
            <td class="text-xs-right">{{ props.item.osbBuyText }} gp</td>
            <td class="text-xs-right">{{ formatNum(props.item.profit) }} gp</td>
            <td class="text-xs-right">{{ props.item.limits }}</td>
            <td class="text-xs-right">{{ props.item.active }}</td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import limits from '@/assets/limits.js'
export default {
  name: 'HaCalc',
  props: ['prices', 'img'],
  data () {
    return {
      search: '',
      pagination: {'sortBy': 'profit', 'descending': true, 'rowsPerPage': 25},
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'HA price', value: 'HAPrice' },
        { text: 'GE price (buy price)', value: 'osbBuy' },
        { text: 'HA profitability', value: 'profit' },
        { text: 'GE limit', value: 'limits' },
        { text: 'active?', value: 'active' }
      ],
      osrsItems: []
    }
  },
  mounted: function () {
    document.title = 'HA calculator - GE Spy'
    var natPrice = this.prices.filter(row => row.id === 561)[0].osbOverall
    var citems = this.prices.filter(row => Math.floor(0.6 * row.storePrice) > natPrice && row.osbBuy > 0)
    citems.forEach(elem => {
      elem.HAPrice = Math.floor(0.6 * elem.storePrice)
      elem.profit = elem.HAPrice - elem.osbBuy - natPrice
      var limitSearch = limits.filter(filterRow => filterRow.item === elem.name)[0]
      elem.limits = limitSearch ? limitSearch.limit : 'Unknown'
      elem.active = elem.osbBuy > 0
    })
    this.osrsItems = citems
  },
  methods: {
    formatNum (inNum) {
      return inNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  destroyed: function () {
    document.title = 'GE Spy'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
