<template>
  <div style="padding:15px">
    <div style="float:left;width:100%">
      <span style="float:left"><h2>casts per hour: </h2></span>
      <span style="display:inline;width:120px;float:left"><v-text-field
      label="Casts per hour"
      v-model="hourlyRate"
      type="number"
      solo
    ></v-text-field></span>
    </div>
    <table style="width:100%;float:left;text-align:center;clear:both;border-collapse:collapse">
      <thead>
        <tr>
          <th>Output</th>
          <th>Cost</th>
          <th>Profit</th>
          <th>XP/hr</th>
          <th>GP/hr</th>
          <th>GP/XP</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="item in outputPlanks" :key="item.output.id" style="border-top:1px solid white">
        <td>{{item.output.count}} x <router-link style="color: white" :to="'/item/' + item.output.id + '/' + item.output.name">{{item.output.name}}</router-link> ({{formatNum(item.output.count*item.output.price)}} gp)</td>
        <td style="text-align:left">
          total: {{formatNum(item.totalPrice)}} gp<br/>
          <span v-if="item.fee">fee: {{formatNum(item.fee)}} gp</span>
          <ul>
            <li v-for="item2 in item.computedInput" :key="item2.id">
              {{item2.count}} x <router-link style="color: white" :to="'/item/' + item2.id + '/' + item2.name">{{item2.name}}</router-link> ({{formatNum(item2.price * item2.count)}} gp)
            </li>
          </ul>
        </td>
        <td>{{formatNum((item.output.price * item.output.count) - item.totalPrice)}} gp</td>
        <td>{{formatNum(hourlyRate * item.xp)}}</td>
        <td>{{formatNum(((item.output.price * item.output.count) - item.totalPrice) * hourlyRate)}} gp</td>
        <td>{{formatNum((((item.output.price * item.output.count) - item.totalPrice) / item.xp).toFixed(2))}} gp</td>
      </tr>
      </tbody>
    </table>
    <br style="clear:both"/>
  </div>
</template>

<script>
export default {
  name: 'LunarCalcPlank',
  props: ['prices', 'img', 'elements'],
  data () {
    return {
      hourlyRate: 1850,
      plankSpells: [
        {
          output: {
            id: 960,
            count: 1
          },
          input: [
            {
              id: 1511,
              count: 1
            }, {
              id: 557,
              count: 15
            }, {
              id: 561,
              count: 1
            }, {
              id: 9075,
              count: 2
            }
          ],
          fee: 70,
          xp: 90
        }, {
          output: {
            id: 8782,
            count: 1
          },
          input: [
            {
              id: 6332,
              count: 1
            }, {
              id: 557,
              count: 15
            }, {
              id: 561,
              count: 1
            }, {
              id: 9075,
              count: 2
            }
          ],
          fee: 1050,
          xp: 90
        }, {
          output: {
            id: 8778,
            count: 1
          },
          input: [
            {
              id: 1521,
              count: 1
            }, {
              id: 557,
              count: 15
            }, {
              id: 561,
              count: 1
            }, {
              id: 9075,
              count: 2
            }
          ],
          fee: 175,
          xp: 90
        }, {
          output: {
            id: 8780,
            count: 1
          },
          input: [
            {
              id: 6333,
              count: 1
            }, {
              id: 557,
              count: 15
            }, {
              id: 561,
              count: 1
            }, {
              id: 9075,
              count: 2
            }
          ],
          fee: 350,
          xp: 90
        }
      ]
    }
  },
  methods: {
    formatNum (inNum) {
      return inNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    outputPlanks: function () {
      var plank = [...this.plankSpells]
      plank.forEach(elem => {
        elem.output.name = this.prices.filter(row => row.id === elem.output.id)[0].name
        elem.output.price = this.prices.filter(row => row.id === elem.output.id)[0].osbOverall
        elem.computedInput = elem.input.filter(row => !this.elements[row.id])
        elem.totalPrice = elem.fee + 0
        elem.computedInput.forEach(elem2 => {
          elem2.name = this.prices.filter(row => row.id === elem2.id)[0].name
          elem2.price = this.prices.filter(row => row.id === elem2.id)[0].osbOverall
          elem.totalPrice += (elem2.count * elem2.price)
        })
      })
      return plank
    }
  },
  mounted: function () {
  },
  watch: {
    elements: function () {
      console.log('hanged!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .staffHolder {
   float: left;
   margin-right:25px;
 }
</style>
