<template>
  <v-container fluid class="page">
    <v-layout row wrap>
      <v-flex xs12 md4 pa-2 v-for="i in Array(3)" :key="i">
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs4>
                  <v-icon class="display-3">mdi-clipboard-text</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="text-xs-right">
                  <div class="headline">Tyylitehtäviä jäljellä</div>
                  <div class="display-2">45</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      source: 'https://noire.io'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
