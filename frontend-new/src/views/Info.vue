<template>
  <v-container class='page'>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>About</v-card-title>
          <v-card-text>
            GE Spy is an open source webapp for browsing oldschool runescape item prices, data is collected from osbuddy apis periodically, and item images are property of jagex
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Recent changes</v-card-title>
          <v-card-text>
            <v-list two-line>
              <v-list-item two-line
                v-for="elem in ghubReturn"
                :key="elem.sha"
                :href="elem.html_url"
                target="_blank"
              >
                <v-list-item-avatar>
                  <img :src="elem.author.avatar_url"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{elem.commit.message || "unknown"}}</v-list-item-title>
                  <v-list-item-subtitle>{{elem.author.login}} - {{elem.commit.author.date.split("T")[0] || "unknown"}}</v-list-item-subtitle>
                </v-list-item-content>

                <!--<v-list-item-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">mdi-arrow-right-drop-circle</v-icon>
                  </v-btn>
                </v-list-item-action>-->
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'info',
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
  },
  destroyed: function () {
  },
  activated () {
    this.$store.dispatch('navTabs/setTabName', 'Information')
  },
  components: {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
