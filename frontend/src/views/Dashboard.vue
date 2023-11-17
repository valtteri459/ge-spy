<template>
  <h1>Dashboard</h1>
  <pre>{{ JSON.stringify(reactiveValue, null, 2) }}</pre>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import {io} from 'socket.io-client'

const reactiveValue = ref<any>(0)
const socket = io('http://localhost:4000');
socket.connect()
console.log('socket set', socket)
socket.on("connect", () => {
  reactiveValue.value = 69;
});

socket.on("disconnect", () => {
  reactiveValue.value = 420;
});

socket.on("api/unstablePrices", (newPrices) => {
  reactiveValue.value = newPrices
});

</script>
