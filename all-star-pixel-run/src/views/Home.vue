<template>
  <div class="home">
    <div class="start" v-if="start">
      <img id="bats" src="../assets/bats.gif" alt="bats">
    </div>
    <div class="home-part" id="logoPart">
      <img id="landingLogo" src="../assets/All-Star-Pixel-Run.png" alt="Logo">
    </div>
    <div class="home-part">
      <div id="forStartButton" class="bottomPart">
        <div id="startButton" @click="startGame">
          <img src="../assets/Start.png" alt="startLogo">
        </div>
      </div>
      <div class="bottomPart" id="forChara">
        <div class="charaIntro">
          <img class="chara mr-2" src="../assets/p1.gif" alt="">
          <img class="chara mr-2" src="../assets/p2.gif" alt="">
          <img class="chara mr-2" id="sonic" src="../assets/p3.gif" alt="">
          <img class="chara mr-2" src="../assets/p4.gif" alt="">
          <img class="chara mr-2" src="../assets/p5.gif" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      start: false
    }
  },
  methods: {
    startGame () {
      this.start = true
      this.$store.commit('PLAY_BATS')
      setTimeout(() => { 
        this.$store.commit('PAUSE_BATS')
        this.$router.push('/start')
        }, 1500);
    }
  }
}
</script>

<style scoped>
@keyframes ZoomIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes ZoomIn2 {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0)
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slideInFromLeft {
    0% {
        transform: translateX(-100%);
    }
    25% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}
#bats {
  height: 100vh;
  width: 100vw;
}
.start {
  animation: 1s ease-out 0s 1 ZoomIn;
  height: 100%;
  width: 100%;
  z-index: 3;
  position: absolute;
}
#sonic {
  transform: rotateY(180deg);
}
.chara {
  height: 100%;
  width: 10%;
}
.charaIntro {
  display: flex;
  justify-content: center;
  animation: 3s ease-out 0s 1 slideInFromLeft;
}
#forChara {
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.bottomPart {
  height: 50%;
  width: 100%;
}
#landingLogo {
  animation: 1s ease-out 0s 1 ZoomIn;
}
#forStartButton {
  display: flex;
  justify-content: center;
}
#startButton {
  animation: 2s ease-out 0s 1 ZoomIn2;
  height: 10vh;
  width: 17vw;
  background-color: blue;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  border: 5px solid black;
}
#startButton:hover {
  background-color: rgb(251, 255, 0);
}
#startButton:active {
  background-color: blue;
}
.home {
  height: 100%;
  width: 100%;
  background-image: url('../assets/landingPageWallpaper.gif');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-part {
  height: 50%;
  width: 100%;
  z-index: 1;
}
#logoPart {
  display: flex;
  flex-direction: column-reverse;
  justify-content: start;
  align-items: center;
  padding-bottom: 5%;
}
</style>
