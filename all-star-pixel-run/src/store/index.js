import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    bats: new Audio(require('../assets/bats.mp3')),
    menu: new Audio(require('../assets/menu.mp3')),
    race: new Audio(require('../assets/jungle.mp3')),
    roomList: [],
    players: 0
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
    },
    SET_ROOMLIST (state, payload) {
      state.roomList = payload
    },
    ADD_PLAYER (state, payload) {
      state.players += 1
    }
  },
  actions: {
    createUser (state, payload) {
      axios({
        url: 'http://localhost:3000/users',
        method: 'post',
        data: {
          username: payload.userName
        }
      })
      .then(({ data }) => {
        localStorage.setItem('id', data.id)
      })
      .catch(err => {
        console.log(err);
      })
    },
    createRoom (state, payload) {
      axios({
        url: 'http://localhost:3000/rooms',
        method: 'post',
        data: {
          name: payload.roomName
        }
      })
      .then(({ data }) => {
        this.dispatch('getAllRoom')
        this.commit('ADD_PLAYER')
        router.push(`/loading/${data.name}`)
        localStorage.setItem('playerNum', 1)
      })
    },
    getAllRoom( state, payload){
      axios({
        url: 'http://localhost:3000/rooms',
        method: 'get'
      })
      .then(({ data })=> {
        this.commit('SET_ROOMLIST', data)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})
