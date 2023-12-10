<template>
  <v-container
    class="py-8 px-6"
    fluid
  >
    <h1>Item information</h1>
    <p>add more specific item info here about item ID {{ itemId }}</p>
    {{ itemData.get(itemId) }}
  </v-container>
</template>

<script lang="ts" setup>
import { useItemData } from '@/api/index.js';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { watchEffect } from 'vue';

const route = useRoute()
const itemData = useItemData()
const itemId = ref<number>(0)
watchEffect(async () => {
  if(!Array.isArray(route.params.id))
  itemId.value = parseInt(route.params.id)
})
</script>
