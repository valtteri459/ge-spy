<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/changes">
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Info</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-autocomplete
          v-model="selectedItem"
          :items="plausibleItems"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          flat
          class="mx-4"
          solo-inverted
          hide-no-data
          hide-details
          hide-selected
          item-text="name"
          item-value="id"
          placeholder="Item search"
          return-object>
          <template v-slot:item="data">
            <v-list-item-avatar>
              <img :src="prefix + data.item.id">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle>
                → {{numberFormatter(data.item.osbOverall)}} Coins ↓ {{numberFormatter(data.item.osbBuy)}} Coins ↑ {{numberFormatter(data.item.osbSell)}} Coins
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-toolbar-title>
      <navigationTabs></navigationTabs>
    </v-app-bar>

    <v-content>
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </v-content>
    <v-footer app>
      <span>GE-Spy v.2 </span>
    </v-footer>
  </v-app>
</template>

<script>
import itemsRepository from './repositories/items'
import helpers from './components/helpers'
import navigationTabs from './components/navigationTabs.vue'
export default {
  data: () => ({
    drawer: null,
    selectedItem: null,
    plausibleItems: [],
    isLoading: false,
    search: null,
    prefix: ''
  }),
  methods: {
    numberFormatter: helpers.numberFormatter
  },
  components: {
    navigationTabs
  },
  watch: {
    selectedItem (val) {
      if (val) {
        console.log(val)
        /* HANDLE OPENING ITEM TAB HERE */
        this.$nextTick(() => {
          this.selectedItem = null
          this.search = null
        })
      }
    },
    search (val) {
      // Items have already been loaded
      if (this.plausibleItems.length > 0) return

      if (this.isLoading) return

      itemsRepository.getItems().then(e => {
        this.plausibleItems = e.data
      }).catch(e => {
        alert('FETCH ERROR' + JSON.stringify(e))
      }).finally(() => {
        this.isLoading = false
      })
    }
  },
  async created () {
    this.$vuetify.theme.dark = true
    this.prefix = (await itemsRepository.getPrefix()).data.imagePrefix
  }
}
</script>
