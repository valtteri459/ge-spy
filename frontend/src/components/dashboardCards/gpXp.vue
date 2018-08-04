<template>
  <v-container pa-0 ma-0>
    <div style="display: flex;height:100%">
      <div style="flex-grow: 1">
        <h2>
          {{calcedXpGp}} gp/xp
        </h2>
        <p>{{opts.customName}}</p>
        <v-btn flat color="orange" @click="moreDialog=true">more info</v-btn>
      </div>
    </div>
    <v-dialog v-model="moreDialog" max-width="500px">
      <v-card>
          <v-card-title>
            Xp per hour details "{{opts.customName}}"
          </v-card-title>
          <v-card-text>
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
            <h4>Results</h4>
            gained xp: {{opts.gainedXp}}<br/>
            gp delta: {{formatNum(this.sum)}} gp
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer><v-btn color="primary" flat @click.stop="moreDialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Inventory',
  props: ['prices', 'img', 'opts', 'self'],
  data () {
    return {
      moreDialog: false,
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
  },
  computed: {
    calcedXpGp: function () {
      return this.sum / this.opts.gainedXp
    }
  },
  methods: {
    formatNum (inNum) {
      return inNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
