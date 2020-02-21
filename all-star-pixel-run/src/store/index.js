import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    bats: new Audio(require('../assets/bats.mp3')),
    menu: new Audio(require('../assets/menu.mp3')),
    race: new Audio(require('../assets/jungle.mp3'))
  },
  mutations: {
    SET_USERNAME (state, payload) {
      state.userName = payload
    },
    PLAY_BATS (state, payload) {
      state.bats.play()
    },
    PAUSE_BATS (state, payload) {
      state.bats.pause()
    },
    PLAY_MENU (state, payload) {
      state.menu.play()
    },
    PAUSE_MENU (state, payload) {
      state.menu.pause()
    },
    PLAY_RACE (state, payload) {
      state.race.play()
    },
    PAUSE_RACE (state, payload) {
      state.race.pause()
    }
  },
  actions: {
  }
})
