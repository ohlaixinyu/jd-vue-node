import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('JD_USER'))
    // user:null
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem('JD_USER', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
