<template>
  <div>
    <div class="Win"></div>
    <div class="sideBar">
      <div class="leaderBoard">
        <h3>
          <i class="fas fa-trophy"></i>Player List
        </h3>
        <div class="score">
          <ul>
            <li v-for="(playerName, i) in playerNames" :key="i" style="display:flex;">
              {{playerName}}
              <img
                :id="`pic${i+1}`"
                class="playerSprites"
                :src="require(`../assets/p${i+1}.gif`)"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="suitDiv">
        <div class="top">
          <div class="circle circle1" v-on:click="choose('batu')"></div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="circle circle2" v-on:click="choose('gunting')"></div>
          </div>
          <div class="right">
            <div class="circle circle3" v-on:click="choose('kertas')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="board">
      <div class="boardDiv">
        <div v-for="(number, i) in numbers" v-bind:key="i">
          <div v-bind:class="(!hidden.includes(number))?'block img':'block hidden img'">
            <div class="top2">
              <div class="left">
                <div v-if="step[0] == number">
                  <img src="../assets/p1.gif" alt />
                </div>
              </div>
              <div class="right">
                <div v-if="step[1] == number">
                  <img src="../assets/p2.gif" alt />
                </div>
              </div>
            </div>
            <div class="mid2">
              <div v-if="step[2] == number">
                <img src="../assets/p3.gif" alt />
              </div>
            </div>
            <div class="bottom2">
              <div class="left">
                <div v-if="step[3] == number">
                  <img src="../assets/p4.gif" alt />
                </div>
              </div>
              <div class="right">
                <div v-if="step[4] == number">
                  <img src="../assets/p5.gif" alt />
                </div>
              </div>
            </div>
            <div v-if="left.includes(number)" class="center">
              <i class="fas fa-chevron-left"></i>
              <i class="fas fa-chevron-left"></i>
            </div>
            <div v-if="top.includes(number)" class="center2">
              <div>
                <i class="fas fa-chevron-up"></i>
              </div>
              <div class="cium">
                <i class="fas fa-chevron-up"></i>
              </div>
            </div>
            <div v-if="right.includes(number)" class="center3">
              <i class="fas fa-chevron-right"></i>
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
        <div class="timeDiv">
          <div class="time">
            <h3>{{timeTitle}} => {{time}} s</h3>
          </div>
        </div>
        <div class="rulePic"></div>
        <div class="rule">
          <div class="textDiv">
            <h4>Bonus suit!</h4>
            <div class="suitDiv2">
              <img src="../../public/images/rock2.svg" /> X 3
            </div>
            <div class="suitDiv2">
              <img src="../../public/images/papper2.svg" /> X 2
            </div>
            <div class="suitDiv2">
              <img src="../../public/images/scissor2.svg" /> X 1
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InGame",
  data() {
    return {
      numbers: null,
      hidden: [8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 23, 24, 25, 26, 27],
      left: [1, 2, 3, 4, 5, 6],
      right: [30, 29, 22, 21, 14],
      top: [28, 20, 13, 7],
      timeTitle: null,
      time: null,
      rute: [30, 29, 28, 22, 21, 20, 14, 13, 7, 1, 2, 3, 4, 5, 6],
      step: [30, 30, 30, 30, 30],
      nextSuit: null,
      nextSuits: null,
      score: null,
      win: null,
      playerNames: null
    };
  },
  methods: {
    addNumber() {
      this.numbers = [];
      for (let i = 1; i <= 30; i++) {
        this.numbers.push(i);
      }
    },
    setReadyTime() {
      this.timeTitle = "Start";
      this.time = 20;
    },
    countDown() {
      if (this.time > 0) {
        setTimeout(() => {
          this.time -= 1;
          this.countDown();
        }, 1000);
      } else {
        if (this.timeTitle == "Start") {
          this.timeTitle = "Loading";
          this.time = 5;
          this.countDown();
        } else if (this.timeTitle == "Loading") {
          this.timeTitle = "Play";
          this.time = 5;
          this.countDown();
        } else {
          this.$socket.emit("showResult");
          this.suit();
          this.turn(this.score);
          this.timeTitle = "Loading";
          this.time = 5;
          this.countDown();
        }
      }
    },
    move(i, a, b) {
      if (a < b && a < this.rute.length) {
        setTimeout(() => {
          a += 1;
          this.step[i] = this.rute[a];
          this.step = [...this.step];
          this.move(i, a, b);
        }, 500);
      } else {
        if (a == this.rute.length) {
          this.win = `Player ke-${i + 1}`;
        }
      }
    },
    turn(steps) {
      this.step.forEach((el, i) => {
        let awal = this.rute.indexOf(el);
        let akhir = awal + steps[i];
        this.move(i, awal, akhir);
      });
    },
    choose(str) {
      if (!str) {
        const arr = ["batu", "kertas", "gunting"];
        this.nextSuits = arr[Math.round(Math.random() * 2)];
      } else {
        this.nextSuit = str;
      }
      this.$socket.emit("sendSuit", this.nextSuit);
    },
    suit() {
      const batu = this.nextSuits.filter(el => el.toLowerCase() == "batu")
        .length;
      const kertas = this.nextSuits.filter(el => el.toLowerCase() == "kertas")
        .length;
      const gunting = this.nextSuits.filter(el => el.toLowerCase() == "gunting")
        .length;

      this.score = [];
      this.nextSuits.forEach(el => {
        switch (el) {
          case "batu":
            this.score.push(batu * 3);
            break;
          case "kertas":
            this.score.push(kertas * 2);
            break;
          case "gunting":
            this.score.push(gunting * 1);
        }
      });
    }
  },
  beforeCreate() {
    this.$socket.emit("startGame");
  },
  created() {
    this.addNumber();
    this.setReadyTime();
    this.countDown();
    this.$store.commit("PAUSE_MENU");
    this.$store.commit("PLAY_RACE");
  },
  mounted() {
    this.$socket.on("gameStarting", playerNames => {
      this.playerNames = playerNames;
    });
    this.$socket.on("result", suits => {
      this.nextSuits = suits;
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Inconsolata:700|Press+Start+2P&display=swap");

.board {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/images/bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow-y: auto;
}
.sideBar {
  position: absolute;
  width: 28%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 2;
}
.leaderBoard {
  position: relative;
  width: 100%;
  height: 55%;
  padding: 10px 20px;
}
.leaderBoard h3 {
  margin-top: 60px;
  text-align: left;
  font-size: 25px;
  color: #ee8434;
  font-family: "Press Start 2P", cursive;
}
.leaderBoard i {
  position: relative;
  top: -5px;
  margin-right: 20px;
}
.score {
  position: relative;
  width: 80%;
  height: auto;
}
.score ul {
  position: relative;
  margin: 0;
  padding: 0px 15px;
}
.score ul li {
  list-style: none;
  text-align: left;
  font-size: 20px;
  font-family: "Press Start 2P", cursive;
  padding: 10px 15px;
}
.suitDiv {
  position: relative;
  width: 100%;
  height: 40%;
}
.top,
.bottom {
  position: relative;
  width: 100%;
  height: 50%;
}

.circle {
  position: relative;
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  float: left;
  border: 6px solid #ee8434;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80px 80px;
}
.circle1 {
  background-image: url("../../public/images/rock.jpg");
}
.circle2 {
  background-image: url("../../public/images/scissor.jpg");
}
.circle3 {
  background-image: url("../../public/images/papper.jpg");
}
.left {
  position: relative;
  width: 50%;
  height: 100%;
  float: left;
}
.right {
  position: relative;
  width: 50%;
  height: 100%;
  float: right;
}
.block {
  position: relative;
  float: right;
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 10px;
  margin: 5px 10px;
  color: white;
  background-image: url("../../public/images/block3.png");
}
.block i {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
.boardDiv {
  position: relative;
  width: 72%;
  height: auto;
  float: right;
  right: 0;
  padding: 30px 0px;
}
.center {
  position: absolute;
  top: 50%;
  left: 48%;
  transform: translate(-50%, -50%);
  animation: mymove 1s infinite;
}
@keyframes mymove {
  0% {
    left: 48%;
  }
  50% {
    left: 52%;
  }
  100% {
    left: 48%;
  }
}
.center2 {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mymove2 1s infinite;
}
@keyframes mymove2 {
  0% {
    top: 52%;
  }
  50% {
    top: 48%;
  }
  100% {
    top: 52%;
  }
}
.center3 {
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
  animation: mymove 1s infinite;
}
@keyframes mymove {
  0% {
    left: 52%;
  }
  50% {
    left: 48%;
  }
  100% {
    left: 52%;
  }
}
.hidden {
  visibility: hidden;
}
.cium {
  position: relative;
  top: -10px;
}
.rulePic {
  position: absolute;
  left: 40%;
  top: 40.3%;
  width: 200px;
  height: 200px;
  background-image: url("../../public/images/rule.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  -moz-transform: scale(-1, -1);
  -o-transform: scale(-1, -1);
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, 1);
}
.rule {
  position: absolute;
  width: 30%;
  height: 40%;
  top: 30%;
  left: 3%;
  background-color: #001514;
  opacity: 0.9;
}
.textDiv {
  position: relative;
  width: 70%;
  height: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid white;
  border-radius: 10px;
  padding: 0px 15px;
}
.textDiv h4 {
  font-family: "Press Start 2P", cursive;
  color: white;
  margin-top: 30px;
  text-align: center;
}
.suitDiv2 {
  position: relative;
  color: white;
  font-family: "Press Start 2P", cursive;
  font-size: 12px;
  text-align: center;
  margin: 25px 0px;
}
.suitDiv2 img {
  position: relative;
  left: 0;
  width: 50px;
  height: 50px;
  top: 15px;
  margin-top: -30px;
}
.timeDiv {
  position: absolute;
  top: 25%;
  left: 38%;
  width: 300px;
  height: 100px;
  background-color: #ee8434;
  opacity: 0.8;
}
.time {
  position: relative;
  width: 75%;
  height: 45%;
  border: 5px solid white;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 15px;
}
.time h3 {
  color: white;
  font-family: "Press Start 2P", cursive;
  font-size: 15px;
}
.top2 {
  position: relative;
  width: 100%;
  height: 33%;
}
.mid2 {
  position: relative;
  width: 100%;
  height: 33%;
}
.mid2 img {
  position: relative;
  left: 25%;
  top: 0%;
  -moz-transform: scale(-1, -1);
  -o-transform: scale(-1, -1);
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, 1);
}
.bottom2 {
  position: relative;
  width: 100%;
  height: 33%;
}
.bottom2 .right img {
  margin-top: -60px;
  margin-left: -20px;
  width: 120px;
  height: 120px;
}
.img img {
  position: relative;
  width: 70px;
  height: 70px;
  margin-top: -20px;
}

.playerSprites {
  height: 5vh;
  margin-left: 20%;
}
#pic3 {
  transform: rotateY(180deg);
}
.win {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>

