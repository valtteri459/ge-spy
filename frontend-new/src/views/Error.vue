<template>
  <v-container class='page'>
    <v-row>
      <v-col>
         <v-alert type="error">
          Invalid route (404)
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'error',
  activated () {
    this.$store.dispatch('navTabs/setTabName', 'error')
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
