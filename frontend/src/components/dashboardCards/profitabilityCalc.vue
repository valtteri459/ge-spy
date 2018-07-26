<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Profitability calculator</h2>
      </v-flex>
      <v-flex xs6>
        <h4>Inputs</h4>
        <table style='width:100%; text-align: center'>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          <tr v-for="inbound in inItems" :key="inbound.id">
            <td><router-link style="color:white" :to="'/item/' + inbound.id + '/' + inbound.name">{{inbound.name}}</router-link></td>
            <td>{{inbound.amount}}</td>
            <td>{{inbound.total}} gp</td>
          </tr>
        </table>
      </v-flex>
      <v-flex xs6>
        <h4>Outputs</h4>
        <table style='width:100%; text-align: center'>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          <tr v-for="inbound in outItems" :key="inbound.id">
            <td><router-link style="color:white" :to="'/item/' + inbound.id + '/' + inbound.name">{{inbound.name}}</router-link></td>
            <td>{{inbound.amount}}</td>
            <td>{{inbound.total}} gp</td>
          </tr>
        </table>
      </v-flex>
      <v-flex xs12><v-divider></v-divider><br/>current estimated profits: {{sum}} gp each</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ProfitabilityWidget',
  props: ['prices', 'img', 'opts'],
  data () {
    return {
      sum: 0,
      inItems: [],
      outItems: []
    }
  },
  mounted: function () {
    this.inItems = this.opts.ins.filter(row => {
      if (row.id === null || row.amount === null) {
        return false
      } else {
        return true
      }
    }).map(row => {
      var item = this.prices.filter(frow => frow.id === row.id)[0]
      var newRow = Object.assign(row, {price: item.osbOverall, name: item.name, total: item.osbOverall * row.amount})
      this.sum = this.sum - newRow.total
      return newRow
    })
    this.outItems = this.opts.outs.filter(row => {
      if (row.id === null || row.amount === null) {
        return false
      } else {
        return true
      }
    }).map(row => {
      var item = this.prices.filter(frow => frow.id === row.id)[0]
      var newRow = Object.assign(row, {price: item.osbOverall, name: item.name, total: item.osbOverall * row.amount})
      this.sum = this.sum + newRow.total
      return newRow
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
