<template>
  <v-container fluid class="page" fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink style="width:100%; max-width:750px">
        <h1>GE SPY item database</h1>
        <v-autocomplete
          v-model="friends"
          :disabled="isUpdating"
          :items="people"
          :loading="loadingData"
          box
          color="blue-grey lighten-2"
          label="Search for an item"
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
                <img :src="data.item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Inventory',
  data () {
    return {
      friends: '',
      isUpdating: false,
      name: 'Item selector',
      people: [],
      loadingData: true
    }
  },
  methods: {
    goToItem () {
      this.$router.push('/item/' + this.friends + '/' + this.people.filter(elem => elem.id === this.friends)[0].name)
    }
  },
  mounted: function () {
    this.loadingData = true
    this.axios.get('/api/imagePrefix').then(resultData => {
      var imgPrfx = resultData.data.imagePrefix
      /* { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
        */
      this.axios.get('/api/catalog').then(itemCatalog => {
        itemCatalog.data.forEach(elem => {
          this.people.push({name: elem.name, id: elem.id, group: elem.members ? 'members' : 'free', avatar: imgPrfx + elem.id})
        })
        this.loadingData = false
      }).catch(e => console.log(e))
    }).catch(e => console.log(e))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
