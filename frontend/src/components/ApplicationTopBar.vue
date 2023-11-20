<template>
  <v-app-bar
    density="compact"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon :onClick="() => {navigationState.sidebar = !navigationState.sidebar}"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <div style="padding-top:20px;max-width:250px">
        <v-autocomplete
          variant="solo"
          :items="searchResults.items"
          v-model="magicValue"
          item-title="name"
          item-value="id"
          placeholder="Item Search"
          density="compact"
          appendIcon="mdi-magnify"
          no-data-text="Write 3 of more characters"
          @update:search="(searchText: string) => {debouncedSearch(searchText)}"
          @update:modelValue="(newValue: number) => {logger(newValue)}"
        >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :prepend-avatar="item.raw.icon"
            :title="item.raw.name"
            :subtitle="item.raw.members ? 'Members' : 'F2P'"
          ></v-list-item>
        </template>
        </v-autocomplete>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
  import {useNavigationState} from '@/states/navigation'
  import {debounce} from '../utils/debounce'
  import { useItemSearch } from '@/api';
  import { ref } from 'vue';

  const magicValue = ref<number|null>(null)
  const searchString = ref<string>("")
  const [sendSearch, searchResults] = useItemSearch()
  const navigationState = useNavigationState()

  const logger = (xd: any) => {
    console.log(xd)
    setTimeout(() => {searchString.value = "";magicValue.value = null;searchResults.items = [],console.log('set to null again')}, 3000)
  }
  const searchFilter = (searchString: string) => {
    if(searchString.length >= 3) {
      sendSearch(searchString)
    }
  }
  const debouncedSearch = debounce(searchFilter, 250)
</script>