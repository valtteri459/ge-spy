<template>
  <div>
    <v-overlay :value="loading" :z-index="1" absolute>
      <v-progress-circular indeterminate color="accent" size="128"></v-progress-circular>
    </v-overlay>
    <v-container class='page' v-if="!loading">
      <v-row>
        <v-col>
          <v-card>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{itemData.name}}</v-list-item-title>
                <v-list-item-subtitle>item ID {{itemData.id}}</v-list-item-subtitle>
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
      </v-row>
      <v-row>
        <v-col>
          <v-alert type="success">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
          <v-alert type="success">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
        </v-col>
        <v-col>
          <v-alert type="success">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
          <v-alert type="warning">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
        </v-col>
        <v-col>
          <v-alert type="success">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
          <v-alert type="error">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
        </v-col>
        <v-col>
          <v-alert type="success">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
          <v-alert type="info">
            coyaaaaaaaaaaaaaaaaa
          </v-alert>
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
