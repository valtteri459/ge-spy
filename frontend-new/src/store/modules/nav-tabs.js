import router from '../../router/index.js'

const navTabs = {
  namespaced: true,
  state: {
    started: false,
    tabs: [],
    currentTab: null
  },
  mutations: {
    SET_STARTED_STATUS (state) {
      state.started = true
    },
    ADD_TAB (state, tab) {
      state.tabs.push(tab)
    },
    SET_CURRENT_TAB (state, tab) {
      state.currentTab = tab
    },
    SET_TAB_NAME (state, name) {
      if (state.currentTab) {
        state.currentTab.name = name
      }
    },
    REMOVE_TAB_AT_INDEX (state, index) {
      state.tabs.splice(index, 1)
    },
    REMOVE_TABS (state) {
      state.tabs = state.currentTab ? [state.currentTab] : []
    },
    UPDATE_STORED_TABS (state) {
      var routes = state.tabs.map(function (tab) {
        return { route: tab.route.fullPath, name: tab.name }
      })
      localStorage.setItem('navtabs', JSON.stringify(routes))
    },
    SET_TABS (state, tabs) {
      state.tabs = tabs
    }
  },
  actions: {
    loadTabs ({ getters }, returnUrl) {
      var tabs = JSON.parse(localStorage.getItem('navtabs')) || []
      tabs.forEach(function (tab) {
        router.push({ path: tab.route })
        var temp = getters.getTabs.find(x => x.route.path === tab.route)
        if (temp) {
          temp.name = tab.name
        }
      })
      if (returnUrl !== router.currentRoute.fullPath) {
        router.push({ path: returnUrl })
      }
    },
    openTab ({ commit, getters, dispatch }, route) {
      if (!getters.getStartedStatus) {
        commit('SET_STARTED_STATUS')
        dispatch('loadTabs', route.fullPath)
        return
      }
      var tab = { route, name: route.name || 'Unknown' }
      document.title = 'GE Spy | ' + tab.name
      if (route.name === 'Login') {
        return
      }
      if (getters.getTabs.length > 0 && getters.getTabs.filter(x => x.route.path === route.path).length > 0) {
        var current = getters.getTabs.filter(x => x.route.path === route.path)[0]
        commit('SET_CURRENT_TAB', current)
        return
      }
      commit('ADD_TAB', tab)
      commit('SET_CURRENT_TAB', tab)
      commit('UPDATE_STORED_TABS')
    },
    closeTab ({ commit, getters }, route) {
      var index = getters.getTabs.findIndex(x => x.route.path === route.path)
      if (getters.getTabs.length === 1) {
        if (getters.getTabs[0].name !== 'Home') {
          router.push({ name: 'Home' })
          commit('REMOVE_TAB_AT_INDEX', index)
        }
      } else {
        router.push(getters.getTabs[index - 1].route)
        commit('REMOVE_TAB_AT_INDEX', index)
      }
      commit('UPDATE_STORED_TABS')
    },
    closeAllTabs ({ commit }) {
      commit('REMOVE_TABS')
      commit('UPDATE_STORED_TABS')
    },
    setTabName ({ commit }, name) {
      commit('SET_TAB_NAME', name)
      commit('UPDATE_STORED_TABS')
    },
    setTabs ({ commit }, tabs) {
      commit('SET_TABS', tabs)
      commit('UPDATE_STORED_TABS')
    }
  },
  getters: {
    getTabs: state => state.tabs,
    getStartedStatus: state => state.started
  }
}

export default navTabs
