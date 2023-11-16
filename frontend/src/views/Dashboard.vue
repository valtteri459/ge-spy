<template>
  <h1>Dashboard</h1>
  {{ reactiveValue }}
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import {io} from 'socket.io-client'

const reactiveValue = ref(0)
const socket = io('http://localhost:4000');
socket.connect()
console.log('socket set', socket)
socket.on("connect", () => {
  reactiveValue.value = 69;
});

socket.on("disconnect", () => {
  reactiveValue.value = 420;
});

socket.on("api/searchItem", (...args) => {
  console.log(args)
  reactiveValue.value++
});

</script>
