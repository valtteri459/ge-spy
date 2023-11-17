<template>
  <v-app id="inspire">
    <ApplicationTopBar/>
    <v-navigation-drawer
      :rail="navigationState.sidebar"
      class="pt-4"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-account-alert"
          title="Guest user"
          subtitle="Log in"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item :onClick="()=>router.push('/dashboard')" prepend-icon="mdi-folder" title="Dashboard" value="myfiles"></v-list-item>
        <v-list-item :onClick="()=>router.push('/item/2')" prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
        <v-list-item :onClick="()=>router.push('/')" prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import ApplicationTopBar from './components/ApplicationTopBar.vue';
  import router from './router';
  import {useNavigationState} from '@/states/navigation'
  const navigationState = useNavigationState()
</script>
