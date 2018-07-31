<template>
  <v-layout row wrap>
    <v-flex xs12 pa-2 pr-3>
      <h3>Staff runes</h3>
        <div class="staffHolder">
          <v-checkbox label="Earth" v-model="elements[557]"></v-checkbox>
        </div>
        <div class="staffHolder">
          <v-checkbox label="Fire" v-model="elements[554]"></v-checkbox>
        </div>
        <div class="staffHolder">
          <v-checkbox label="Water" v-model="elements[555]"></v-checkbox>
        </div>
        <div class="staffHolder">
          <v-checkbox label="Air" v-model="elements[556]"></v-checkbox>
        </div>
    </v-flex>
    <v-flex xs12>
      <v-tabs>
        <v-tab ripple>Plank make</v-tab>
        <v-tab ripple>Tan leather</v-tab>
        <v-tab ripple>String Jewellery</v-tab>
        <v-tab ripple>Bake Pie</v-tab>
        <v-tab ripple>Others</v-tab>
        <v-tab-item>
          <v-card flat>
            <planks :prices="prices" :img="img" :elements="elements"></planks>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <leathers :prices="prices" :img="img" :elements="elements"></leathers>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <strings :prices="prices" :img="img" :elements="elements"></strings>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <pies :prices="prices" :img="img" :elements="elements"></pies>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <others :prices="prices" :img="img" :elements="elements"></others>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import leathers from './lunars/leathers'
import others from './lunars/others'
import pies from './lunars/pies'
import planks from './lunars/planks'
import strings from './lunars/strings'

export default {
  name: 'LunarCalc',
  props: ['prices', 'img'],
  data () {
    return {
      active: false,
      elements: {
        557: true,
        554: false,
        555: true,
        556: false
      }
    }
  },
  mounted: function () {
    document.title = 'Lunar calculator - GE Spy'
  },
  destroyed: function () {
    document.title = 'GE Spy'
  },
  components: {
    leathers,
    others,
    pies,
    planks,
    strings
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
