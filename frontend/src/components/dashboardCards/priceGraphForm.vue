<template>
  <div>
  <h2>Price graph widget options</h2>
  <h4>duration</h4>
  <v-radio-group v-model="selectedTime" @change="goToItem()">
  <v-layout row wrap>
    <v-flex xs4><v-radio :value="7" label="1 Week"></v-radio></v-flex>
    <v-flex xs4><v-radio :value="14" label="2 Weeks"></v-radio></v-flex>
    <v-flex xs4><v-radio :value="30" label="1 Month"></v-radio></v-flex>
  </v-layout>
  </v-radio-group>
  <v-autocomplete
    v-model="selectedItem"
    :items="prices"
    label="Item to find price for"
    item-text="name"
    item-value="id"
    @change="goToItem()"
  >
    <template
      slot="item"
      slot-scope="data"
    >
      <template v-if="typeof data.item !== 'object'">
        <v-list-tile-content v-text="data.item"></v-list-tile-content>
      </template>
      <template v-else>
        <v-list-tile-avatar>
          <img :src="img + data.item.id">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  props: ['value', 'prices', 'img'],
  data () {
    return {
      selectedItem: '',
      selectedTime: 7
    }
  },
  methods: {
    goToItem () {
      this.$emit('input', {'x': 0, 'y': 0, 'w': 5, 'h': 10, 'i': new Date().toString(), 'element': 'priceGraph', 'opts': {item: this.selectedItem, duration: this.selectedTime}})
    }
  },
  mounted: function () {
    this.selectedItem = this.value
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
