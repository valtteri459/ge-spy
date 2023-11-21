<template>
  <v-app-bar-title>
    <div style="padding-top:20px;max-width:250px">
      <v-autocomplete
        variant="solo"
        ref="searchInput"
        :items="searchResults.items"
        v-model="selectedItemValueRef"
        item-title="name"
        item-value="id"
        placeholder="Item Search"
        density="compact"
        appendIcon="mdi-magnify"
        no-data-text="Write 3 of more characters"
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
      <input type="string" style="position:fixed;left:0;top:0;width:0px;height:0px;" ref="hidden_reset_input"/>
    </div>
  </v-app-bar-title>
</template>

<script setup lang="ts">
import { useItemSearch } from '@/api';
  import { ref } from 'vue';

  const hidden_reset_input = ref<HTMLInputElement>()
  const searchInput = ref<HTMLInputElement>()
  const selectedItemValueRef = ref<number|null>(null)
  const searchString = ref<string>("")
  const [sendSearch, searchResults] = useItemSearch()
  

  const logger = (selectedItem: number) => {
    console.log(selectedItem)
    setTimeout(() => {
      searchString.value = ""
      selectedItemValueRef.value = null
      hidden_reset_input?.value?.focus()
      hidden_reset_input?.value?.blur()
      console.log('set to null again')
    }, 3000)
    setTimeout(() => {
      searchInput.value?.focus()
    }, 5000)
  }
</script>