<template>
  <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn
                icon
                large
                :href="source"
                target="_blank"
                slot="activator"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
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
