<template>
  <div class="black-screen">
      <div class="loadingPart">
          <img src="../assets/loading.gif" alt="loading">
          <h1 id="waiting">Waiting for other players: {{players}}/5</h1>
          <button @click="tambah">test</button>
      </div>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  name: 'WaitingRoom',
  data () {
    return {
        players: 1
    }
  },
  methods: {
      tambah () {
        this.players++
      }
  },
  watch: {
    players:  (val) => {
        // this.$router.push('/play')
      if(val == 5) {
        router.push('/play')
      }
    }
  }
}
</script>

<style scoped>
#waiting {
    color: #0be881;
}
.loadingPart {
    height: 100%;
    width: 100%;
    background: rgba(41, 41, 41, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
}
.black-screen {
    margin: 0;
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/startWallpaper.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 100%;
}
</style>
