<template>
   <div>
     <h4>Profitability widget options</h4>
     <h2>inputs</h2>
     <v-divider></v-divider>
     <div v-for="inForm in inFields" :key="inForm.id">
       <v-layout row>
        <v-flex xs4>
          <v-text-field
            label="Amount"
            v-model="inForm.amount"
            @change="inFieldsCheck()"
          ></v-text-field>
        </v-flex>
        <v-flex xs8>
          <v-autocomplete
            v-model="inForm.id"
            :items="localPrices"
            label="Item to find price for"
            item-text="name"
            item-value="id"
            @input="inFieldsCheck()"
          >
            <template
              slot="item"
              slot-scope="data"
            >
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-avatar v-if="data.item.id">
                  <img :src="img + data.item.id">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
      </v-layout>
     </div>
     <h2>outputs</h2>
     <v-divider></v-divider>
     <div v-for="inForm in outFields" :key="inForm.id">
       <v-layout row>
        <v-flex xs4>
          <v-text-field
            label="Amount"
            v-model="inForm.amount"
            @change="outFieldsCheck()"
          ></v-text-field>
        </v-flex>
        <v-flex xs8>
          <v-autocomplete
            v-model="inForm.id"
            :items="localPrices"
            label="Item to find price for"
            item-text="name"
            item-value="id"
            @input="outFieldsCheck()"
          >
            <template
              slot="item"
              slot-scope="data"
            >
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-avatar v-if="data.item.id">
                  <img :src="img + data.item.id">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
      </v-layout>
     </div>
   </div>
</template>

<script>
export default {
  name: 'ProfitabilityCalcForm',
  props: ['value', 'prices', 'img'],
  data () {
    return {
      inFields: [{id: null, amount: 1}],
      outFields: [{id: null, amount: 1}],
      localPrices: []
    }
  },
  methods: {
    inFieldsCheck () {
      console.log('incheck fired')
      var clength = this.inFields.length
      if (clength > 2) {
        var earlierTarget = this.inFields[clength - 2]
        if (earlierTarget.amount < 1) {
          this.inFields.pop()
        }
      }
      console.log(this.inFields)
      if (this.inFields[clength - 1].amount && this.inFields[clength - 1].amount > 0 && this.inFields[clength - 1].id) {
        this.inFields.push({id: null, amount: null})
      }
      this.pushOut()
    },
    outFieldsCheck () {
      console.log('outcheck fired')
      var clength = this.outFields.length
      if (clength > 2) {
        var earlierTarget = this.outFields[clength - 2]
        if (earlierTarget.amount < 1) {
          this.outFields.pop()
        }
      }
      console.log(this.outFields)
      if (this.outFields[clength - 1].amount && this.outFields[clength - 1].amount > 0 && this.outFields[clength - 1].id) {
        this.outFields.push({id: null, amount: null})
      }
      this.pushOut()
    },
    pushOut () {
      this.$emit('input', {'x': 0, 'y': 0, 'w': 5, 'h': 10, 'i': new Date().toString(), 'element': 'profitabilityCalc', 'opts': {ins: this.inFields, outs: this.outFields}})
    }
  },
  mounted: function () {
    this.localPrices = this.prices.slice()
    this.localPrices.unshift({name: '[EMPTY]', id: null})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
