<template>
  <v-container class='page'>
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <h2>Recent changes</h2>
        <v-list two-line>
          <v-list-tile
            v-for="elem in ghubReturn"
            :key="elem.sha"
            avatar
            :href="elem.html_url"
          >
            <v-list-tile-avatar>
              <img :src="elem.author.avatar_url"/>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{elem.commit.message || "unknown"}}</v-list-tile-title>
              <v-list-tile-sub-title>{{elem.author.login}} - {{elem.commit.author.date.split("T")[0] || "unknown"}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      ghubReturn: [{
        commit: {
          message: '',
          author: {
            date: ''
          }
        },
        author: {
          date: '',
          name: '',
          html_url: ''
        }
      }]
    }
  },
  methods: {
    updateData () {
      this.loading = true
      this.axios.get('https://api.github.com/repos/valtteri459/ge-spy/commits').then(resultData => {
        this.ghubReturn = resultData.data
        console.log(resultData)
      }).catch(e => console.log(e))
    }
  },
  mounted: function () {
    this.updateData()
    document.title = 'changes - GE spy'
  },
  destroyed: function () {
    document.title = 'GE spy'
  },
  components: {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
