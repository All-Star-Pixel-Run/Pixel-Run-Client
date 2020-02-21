<template>
  <div class="startPart">
      <div class="top pt-5">
          <img id="host" src="../assets/host.png" alt="">
      </div>
      <div class="bottom">
          <div class="dialogBox">
              <h2>
                  Welcome to All-Star Pixel Run!
              </h2>
              <h2>
                   To start this game, please type in your userName.
              </h2>
              <div class="userInput">
                  <input type="text" id="userName" v-model="userName">
                  <a id="next" href="#" @click.prevent="continueToNext"><i class="fas fa-arrow-circle-right"></i></a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'LoginMenu',
  data () {
    return {
        userName: ''
    }
  },
  methods: {
    continueToNext () {
        this.$store.commit('SET_USERNAME', this.userName)
        this.$router.push('/roomSelection')
    }
  },
  created () {
    this.$store.commit('PLAY_MENU')
  }
}
</script>

<style scoped>
@keyframes slideInFromTop {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0%;
    }
    50% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
}
@keyframes fadeIn2 {
    0% {
        opacity: 0%;
    }
    25% {
        opacity: 0%;
    }
    50% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
}
#next {
    color: white;
    font-size: 2em;
    margin-left:1%;
}
#userName {
    border: none;
    border-radius: 15px;
    background: rgb(83, 83, 83);
    height: 4vh;
    width: 15vw;
    color: white;
    font-size: 1.5em;
    padding-left: 1%;
    padding-right: 1%;
}
#host {
    animation: 1s ease-out 0s 1 slideInFromTop;
    height: 100%;
}
.dialogBox h2 {
    animation: 3s ease-out 0s 1 fadeIn2;
}
.dialogBox {
    height: 80%;
    width: 60%;
    background-image: url('../assets/dialog-box.png');
    background-size: 100%;
    background-repeat: no-repeat;
    animation: 2s ease-out 0s 1 fadeIn;
    text-align:center;
    padding-top: 5%;
    color: white;
}
.top {
    height: 50%;
    display: flex;
    justify-content: center;
}
.bottom {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.startPart {
    margin: 0;
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/startWallpaper.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 100%;
    display: flex;
    flex-direction: column;
}
</style>
