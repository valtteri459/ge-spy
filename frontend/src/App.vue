<script setup>
  import { ref, onMounted } from 'vue'
  import HelloWorld from './components/HelloWorld.vue'
  
  const count = ref(0)
  onMounted(() => {
    console.log(count.value) // 0
  })
</script>

<template>
<v-app>
    <v-main>
      <button @click="count++">{{ count }}</button>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

