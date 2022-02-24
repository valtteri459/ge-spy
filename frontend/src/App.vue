<script setup>
  import { ref, onMounted } from 'vue'
  
  const count = ref(0)
  onMounted(() => {
    console.log(count.value) // 0
  })
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>