<template>
  <v-container class='page'>
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <h2>Recent changes</h2>
        <table>
            <thead>
                <tr>
                    <th>Commit</th>
                    <th>User</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="elem in ghubReturn" :key="elem.sha">
                    <td><a :href="elem.url" target="_blank">{{elem.commit.message || "unknown"}}</a></td>
                    <td><a :href="elem.author.html_url" target="_blank">{{elem.author.login}}</a></td>
                    <td>{{elem.commit.author.date || "unknown"}}</td>
                </tr>
            </tbody>
        </table>
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
