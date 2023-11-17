<template>
  <v-app-bar
    density="compact"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon :onClick="() => {navigationState.sidebar = !navigationState.sidebar}"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Ge spy</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import {useNavigationState} from '@/states/navigation'
  const navigationState = useNavigationState()
</script>