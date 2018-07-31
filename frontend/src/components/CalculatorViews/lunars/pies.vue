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
  name: 'LunarCalcPies',
  props: ['prices', 'img', 'elements'],
  data () {
    return {
      hourlyRate: 1500,
      plankSpells: [
        {
          // Admiral pie
          output: {
            id: 7198,
            count: 1
          },
          input: [
            {
              id: 7196,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 210
        }, {
          // Apple pie
          output: {
            id: 2323,
            count: 1
          },
          input: [
            {
              id: 2317,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 130
        }, {
          // Botanical pie
          output: {
            id: 19662,
            count: 1
          },
          input: [
            {
              id: 19656,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 180
        }, {
          // Fish pie
          output: {
            id: 7188,
            count: 1
          },
          input: [
            {
              id: 7186,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 164
        }, {
          // Garden pie
          output: {
            id: 7178,
            count: 1
          },
          input: [
            {
              id: 7176,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 138
        }, {
          // Meat pie
          output: {
            id: 2327,
            count: 1
          },
          input: [
            {
              id: 2319,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 110
        }, {
          // Mud pie
          output: {
            id: 7170,
            count: 1
          },
          input: [
            {
              id: 7168,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 128
        }, {
          // Redberry pie
          output: {
            id: 2325,
            count: 1
          },
          input: [
            {
              id: 2321,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 72
        }, {
          // Summer pie
          output: {
            id: 7218,
            count: 1
          },
          input: [
            {
              id: 7216,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 260
        }, {
          // Wild pie
          output: {
            id: 7208,
            count: 1
          },
          input: [
            {
              id: 7206,
              count: 1
            }, {
              id: 554,
              count: 5
            }, {
              id: 555,
              count: 4
            }, {
              id: 9075,
              count: 1
            }
          ],
          fee: 0,
          xp: 60 + 240
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
