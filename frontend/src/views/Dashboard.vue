<template>
  <h1>Dashboard</h1>
  {{ reactiveValue }}
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ref } from 'vue';

import {io} from 'socket.io-client'

const reactiveValue = ref(0)
const socket = io('ws://localhost:4000/realtime');

socket.on("connect", () => {
  reactiveValue.value = 69;
});

socket.on("disconnect", () => {
  reactiveValue.value = 420;
});

socket.on("*", (...args) => {
  console.log(args)
  reactiveValue.value++
});

</script>
