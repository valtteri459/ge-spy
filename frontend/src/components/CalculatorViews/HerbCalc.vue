<template>
  <v-layout row wrap>
    <v-flex xs12 pa-2>
      <h4>Ultracompost price: {{prices.filter(row => row.id === 561)[0].osbOverallText}} gp</h4>
      <h5>calculation rates source: <a href="http://oldschoolrunescape.wikia.com/wiki/Calculator:Farming/Herbs" target="_blank">OSRS wikia</a></h5>
      <p>Assumes you're also using desease free patches (trollheim, zeah), if not; expect slightly lower rates</p>
      <v-card>
        <v-card-title>
          Herb farming profitability
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
            <td>{{props.item.level}}</td>
            <td><router-link style="color: white" :to="'/item/' + props.item.herb + '/' + props.item.name">{{ props.item.name }}</router-link> ({{formatNum(props.item.hPrice)}})</td>
            <td><router-link style="color: white" :to="'/item/' + props.item.seed + '/' + props.item.seedName">{{ props.item.seedName }}</router-link> ({{formatNum(props.item.seedPrice)}})</td>
            <td>{{ formatNum(props.item.profit) }} gp</td>
            <td>{{ props.item.xp.toFixed(2) }}</td>
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
export default {
  name: 'HerbCalc',
  props: ['prices', 'img'],
  data () {
    return {
      search: '',
      pagination: {'sortBy': 'level', 'descending': false, 'rowsPerPage': 25},
      headers: [
        {
          text: 'Level',
          sortable: true,
          value: 'level'
        },
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Seed', value: 'seed' },
        { text: 'Expected profit per seed', value: 'profit' },
        { text: 'XP per seed', value: 'xp' }
      ],
      osrsItems: []
    }
  },
  mounted: function () {
    document.title = 'Herb farming calculator - GE Spy'
    var ultraComp = this.prices.filter(row => row.id === 21483)[0].osbOverall
    var citems = [
      {
        level: 9,
        seed: 5291,
        herb: 199,
        xpPlant: 11,
        xpHarvest: 12.5
      },
      {
        level: 14,
        seed: 5292,
        herb: 201,
        xpPlant: 13.5,
        xpHarvest: 15
      },
      {
        level: 19,
        seed: 5293,
        herb: 203,
        xpPlant: 16,
        xpHarvest: 18
      },
      {
        level: 26,
        seed: 5294,
        herb: 205,
        xpPlant: 21.5,
        xpHarvest: 24
      },
      {
        level: 32,
        seed: 5295,
        herb: 207,
        xpPlant: 26.5,
        xpHarvest: 30.5
      },
      {
        level: 38,
        seed: 5296,
        herb: 3049,
        xpPlant: 34,
        xpHarvest: 38.5
      },
      {
        level: 44,
        seed: 5297,
        herb: 209,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 50,
        seed: 5298,
        herb: 211,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 56,
        seed: 5299,
        herb: 213,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 62,
        seed: 5300,
        herb: 3051,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 67,
        seed: 5301,
        herb: 215,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 73,
        seed: 5302,
        herb: 2485,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 79,
        seed: 5303,
        herb: 217,
        xpPlant: 0,
        xpHarvest: 0
      },
      {
        level: 85,
        seed: 5304,
        herb: 219,
        xpPlant: 0,
        xpHarvest: 0
      }
    ]
    citems.forEach(elem => {
      elem.name = this.prices.filter(row => row.id === elem.herb)[0].name
      elem.hPrice = this.prices.filter(row => row.id === elem.herb)[0].osbOverall
      elem.seedName = this.prices.filter(row => row.id === elem.seed)[0].name
      elem.seedPrice = this.prices.filter(row => row.id === elem.seed)[0].osbOverall
      elem.profit = Math.floor((7.705 * elem.hPrice) - ultraComp - elem.seedPrice)
      elem.xp = elem.xpPlant + (7.705 * elem.xpHarvest)
    })
    // level, name, seed (item and price), profit, xp
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
