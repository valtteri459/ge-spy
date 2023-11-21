<template>
  <h1>Dashboard</h1>
  <p>add dashboard here {{ socketStatus.connected }}</p>
  <pre>{{ JSON.stringify(latestPrices.data.slice(0, 5), null, 2) }}</pre>
</template>

<script lang="ts" setup>
import { useSocket, useLatestPrices } from '@/api/index.js';
const socketStatus = useSocket()
const latestPrices = useLatestPrices()
</script>
