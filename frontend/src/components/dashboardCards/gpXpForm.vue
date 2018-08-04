<template>
   <div>
     <h2>gp/xp widget options</h2>
     <v-text-field v-model="name" label="Method name" @change="outFieldsCheck()"></v-text-field>
     <v-text-field v-model="xprates" type="number" label="gained XP" @change="outFieldsCheck()"></v-text-field>
     <v-tooltip right>
      <v-text-field slot="activator" v-model="costOffset" type="number" label="GP offset" @change="outFieldsCheck()"></v-text-field>
      <span>Positive if you get gold, negative if you loose gold (i.e alching is positive)</span>
     </v-tooltip>
     <h4>inputs</h4>
     <v-divider></v-divider>
      <v-layout row wrap>
        <template v-for="inForm in inFields">
        <v-flex xs4 :key="inForm.id">
          <v-text-field
            label="Amount"
            v-model="inForm.amount"
            @change="inFieldsCheck()"
          ></v-text-field>
        </v-flex>
        <v-flex xs8 :key="inForm.id">
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
      </template>
      <v-flex xs12>
        <v-btn @click="inFields.push({id: null, amount: 1})" icon style="float:right" color="primary"><v-icon>mdi-plus</v-icon></v-btn>
      </v-flex>
    </v-layout>
     <h4>outputs</h4>
     <v-divider></v-divider>
      <v-layout row wrap>
      <template v-for="inForm in outFields">
        <v-flex xs4 :key="inForm.id">
          <v-text-field
            label="Amount"
            v-model="inForm.amount"
            @change="outFieldsCheck()"
          ></v-text-field>
        </v-flex>
        <v-flex xs8 :key="inForm.id">
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
      </template>
      <v-flex xs12>
        <v-btn @click="outFields.push({id: null, amount: 1})" icon style="float:right" color="primary"><v-icon>mdi-plus</v-icon></v-btn>
      </v-flex>
    </v-layout>
   </div>
</template>

<script>
export default {
  name: 'gpXpForm',
  props: ['value', 'prices', 'img'],
  data () {
    return {
      inFields: [{id: null, amount: 1}],
      outFields: [{id: null, amount: 1}],
      localPrices: [],
      xprates: 0,
      name: '',
      costOffset: 0
    }
  },
  methods: {
    inFieldsCheck () {
      console.log('incheck fired')
      this.pushOut()
    },
    outFieldsCheck () {
      console.log('outcheck fired')
      this.pushOut()
    },
    pushOut () {
      this.$emit('input', {'x': 0, 'y': 0, 'w': 5, 'h': 4, 'i': new Date().toString(), 'element': 'gpXp', 'opts': {costOffset: this.costOffset, customName: this.name, gainedXp: this.xprates, ins: this.inFields, outs: this.outFields}})
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
