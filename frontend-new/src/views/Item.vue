<template>
  <div>
    <v-overlay :value="loading" :z-index="1" absolute>
      <v-progress-circular indeterminate color="accent" size="128"></v-progress-circular>
    </v-overlay>
    <v-container class='page' v-if="!loading">
      <v-row>
        <v-col sm="12" md="6">
          <v-card>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{itemData.name}}
                  <v-tooltip bottom v-if="itemData.members">
                    <template v-slot:activator="{ on }">
                      <v-icon color="yellow" v-on="on">mdi-star</v-icon>
                    </template>
                    <span>Members item</span>
                  </v-tooltip>
                </v-list-item-title>
                <v-list-item-subtitle>item ID {{itemData.id}} - updated {{Math.floor(Math.abs(new Date() - parseISOString(this.itemData.updatedAt))/1000/60)}} minutes ago ({{new Date(parseISOString(this.itemData.updatedAt)).toLocaleString()}})</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
              >
                <v-img :src="`${prefix}${itemData.id}`"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Market information</v-card-title>
            <v-card-text>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th>Current price</th>
                    <th>Sell price</th>
                    <th>Buy price</th>
                    <th>market price</th>
                    <th>High alchemy price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{numberFormatter(itemData.overall || 0)}} coins</td>
                    <td>{{numberFormatter(itemData.osbSell || 0)}} coins</td>
                    <td>{{numberFormatter(itemData.osbBuy || 0)}} coins</td>
                    <td>{{numberFormatter(itemData.storePrice || 0)}} coins</td>
                    <td>{{numberFormatter(Math.floor(0.6*(itemData.storePrice || 0)))}} coins</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert type="success">
            coya
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import items from '../repositories/items'
import helpers from '../components/helpers'

export default {
  name: 'Item',
  props: ['id'],
  data: () => ({
    loading: true,
    loadingGraphs: true,
    itemData: {}
  }),
  methods: {
    numberFormatter: helpers.numberFormatter,
    updateData () {

    },
    parseISOString (s) {
      var b = s.split(/\D+/)
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
    }
  },
  computed: {
    prefix () {
      return this.$prefix
    }
  },
  async created () {
    this.itemData = await items.getItem(this.id)
    this.$store.dispatch('navTabs/setTabName', this.itemData.name)
    this.loading = false
  },
  mounted () {
    this.updateData()
  },
  activated () {
    console.log('itemtab opened', this.id)
  }
}
</script>
