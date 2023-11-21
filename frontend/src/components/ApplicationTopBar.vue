<template>
  <v-app-bar
    density="compact"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon :onClick="() => {navigationState.sidebar = !navigationState.sidebar}"></v-app-bar-nav-icon>
    </template>
    <top-bar-search></top-bar-search>
  </v-app-bar>
</template>

<script setup lang="ts">
  import TopBarSearch from './TopBarSearch.vue'
  import {useNavigationState} from '@/states/navigation'
  const navigationState = useNavigationState()
</script>