<template>
  <v-container fluid class="page">
    <v-layout row wrap>
      <v-flex xs12 md4 pa-2>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs4>
                  <v-icon class="display-3">mdi-clipboard-text</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="text-xs-right">
                  <div class="headline">Here will be an item flipping guide</div>
                  <div class="display-2">45</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 pa-2>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs4>
                  <v-icon class="display-3">mdi-clipboard-text</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="text-xs-right">
                  <div class="headline">Maybe some cool graphs too</div>
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
  name: 'FlipCalc',
  props: ['prices', 'img'],
  data () {
    return {
      source: 'https://noire.io'
    }
  },
  mounted: function () {
    document.title = 'Flipping calculator - GE Spy'
  },
  destroyed: function () {
    document.title = 'GE Spy'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
