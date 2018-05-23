<template>

  <div id="app">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <v-app id="inspire" left-sidebar top-toolbar dark>
      <v-navigation-drawer persistend fixed left v-model="sideOpen" app>
            <v-list>
              <v-list-tile>
                  <v-list-tile-content>
                      <v-list-tile-title >
                          <span>Menu</span>
                      </v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <template v-for="item in items">
                  <v-list-tile v-bind:href="item.href" v-bind:to="{name: item.href}" v-if="item.href !== 'spacer'" :key="item.href">
                      <v-list-tile-action>
                          <v-icon light v-html="item.icon" style="color: #E91E63"></v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title v-html="item.title" style="color: white"></v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-else :key="item.icon"></v-divider>
              </template>
          </v-list>
      </v-navigation-drawer>
      <v-toolbar class="indigo" dark app>
        <v-toolbar-side-icon @click.stop="sideOpen = !sideOpen"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text hidden-sm-and-down">Example site</v-toolbar-title>
        <v-spacer class="hidden-xs-only"></v-spacer>
        <v-spacer v-if="!searchOpen" class="hidden-sm-and-up"></v-spacer>
        <v-text-field
          v-if="searchOpen"
          light
          solo
          prepend-icon="search"
          placeholder="Type keyword...">
        </v-text-field>
        <v-btn class="float:right" icon @click.stop="searchOpen = !searchOpen">
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer class="indigo" dark app>
        <span>all broke dang</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    items: [
      {href: 'home', router: true, icon: 'home', title: 'home'},
      {href: 'home2', router: true, icon: 'settings', title: 'settings'},
      {href: 'home3'},
      {href: 'home4', router: true, icon: 'info', title: 'about'}
    ],
    sideOpen: false,
    searchOpen: false
  }),
  methods: {
    setTo: (target) => {
      this.selected = target
    }
  },
  computed: {
  }
}
</script>

<style>

</style>
