<template>
  <div>
  <h3>Item price widget options</h3>
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
      selectedItem: ''
    }
  },
  methods: {
    goToItem () {
      this.$emit('input', {'x': 0, 'y': 0, 'w': 5, 'h': 4, 'i': new Date().toString(), 'element': 'itemPrice', 'opts': {targetItem: this.selectedItem}})
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
