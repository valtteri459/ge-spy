<template>
<div id="app">
  <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
  <v-app id="inspire" dark>
    <v-toolbar
      dark
      fixed
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class='hidden-sm-and-down'>GE spy</v-toolbar-title>
      <v-spacer class='hidden-sm-and-down'></v-spacer>
    </v-toolbar>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      clipped
    >
      <v-list dense expand>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/search/">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Item search</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-group
            v-for="item in items"
            :key="item.title"
            :prepend-icon="item.action"
            :value="true"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="subItem.target">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer app class="pl-3 pr-3">
      <span>GE Spy - open source project by valtteri459</span>
      <v-spacer></v-spacer>
      <span>&copy; 2018 (MIT license)</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    drawer: true,
    keepOpen: true,
    items: [
      {
        action: 'mdi-database',
        title: 'Inventory',
        items: [
          { title: 'Current inventory', target: '/inventory' },
          { title: 'Value history', target: '/valueHistory' }
        ]
      },
      {
        action: 'mdi-cart',
        title: 'Transactions',
        items: [
          { title: 'Transaction history', target: '/transactions' }
        ]
      },
      {
        action: 'mdi-calculator',
        title: 'Calculators',
        items: [
          { title: 'Alch profitability' },
          { title: 'Herb profitability' },
          { title: 'Trees/Fruit trees' },
          { title: 'Flipping calculator' }
        ]
      }
    ]
  }),
  methods: {
    log (string) {
      console.log(string)
    }
  },
  components: {
  }
}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
