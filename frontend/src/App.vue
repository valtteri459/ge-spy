<template>
  <v-app id="inspire">
    <ApplicationTopBar/>
    <navigation-sidebar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
  import ApplicationTopBar from './components/ApplicationTopBar.vue'; 
  import NavigationSidebar from './components/NavigationSidebar.vue'
</script>
