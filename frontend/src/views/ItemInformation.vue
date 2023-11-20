<template>
  <h1>Item info</h1>
  <pre>{{ itemList }}</pre>
  <button :onClick="() => sendQuery('Abyssal')">epic</button>
</template>

<script lang="ts" setup>
import { useItemSearch } from '@/api/index.js';

const [sendQuery, itemList] = useItemSearch()

</script>
