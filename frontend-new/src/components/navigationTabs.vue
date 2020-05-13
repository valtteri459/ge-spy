<template>
  <v-tabs :value="activeIndex" show-arrows slider-color="white">
    <draggable v-model="tabs" tag="span" group="tabs">
      <v-tab
        v-for="(tab, i) in tabs"
        icons-and-text
        :key="'tab-' + i"
        style="min-width: 115px; padding-left: 10px; padding-right: 2px; font-size: 11px;"
        @click.middle.stop="closeTab(i)"
        @change="activeChange(i, tab.route)"
      >
        {{ localizeTabName(tab.name) }}
        <v-spacer></v-spacer>
        <v-btn
          v-if="tab.route.name != 'Login'"
          icon
          x-small
          :key="'icon-' + i"
          class="ma-0"
          v-on:click.stop
          @click="closeTab(i)"
        >
          <v-icon x-small>mdi-close</v-icon>
        </v-btn>
      </v-tab>
    </draggable>
  </v-tabs>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  data: () => ({
    started: false
  }),
  mounted () {},
  methods: {
    localizeTabName (name) {
      return name.toUpperCase()
    },
    activeChange (index, route) {
      if (index === this.activeIndex) return
      this.$router.push(route.path)
    },
    closeTab (index) {
      var spliceFromTabs = true
      if (index === 0) {
        if (this.tabs.length === 1) {
          if (this.$route.fullPath !== '/') {
            this.$router.push({ name: 'Home' })
          } else {
            spliceFromTabs = false
          }
        } else if (index === this.activeIndex) {
          this.$router.push(this.tabs[index + 1].route)
        }
      } else if (index === this.activeIndex) {
        this.$router.push(this.tabs[index - 1].route)
      }
      if (spliceFromTabs) {
        this.tabs.splice(index, 1)
        this.$store.dispatch('navTabs/setTabs', this.tabs)
      }
    }
  },
  computed: {
    activeIndex () {
      return this.tabs.findIndex(x => x.route.path === this.$route.path)
    },
    tabs: {
      get () {
        return this.$store.getters['navTabs/getTabs']
      },
      set (value) {
        this.$store.dispatch('navTabs/setTabs', value)
      }
    }
  },
  watch: {},
  components: {
    draggable
  }
}
</script>
<style scoped>
/* Hack to make 'draggable'-wrapper work */
.v-slide-group__content > span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  position: relative;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
}
</style>
