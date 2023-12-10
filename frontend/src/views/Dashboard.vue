<template>
  <v-container
    class="py-8 px-6"
    fluid
  >
    <h1>Dashboard</h1>
    <pre>{{ JSON.stringify(latestPrices.data.slice(0, 5), null, 2) }}</pre>
  </v-container>
</template>

<script lang="ts" setup>
import { useLatestPrices } from '@/api/index.js';
const latestPrices = useLatestPrices()
</script>
