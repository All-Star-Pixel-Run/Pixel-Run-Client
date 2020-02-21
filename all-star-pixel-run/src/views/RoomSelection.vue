<template>
  <div class="RoomSelectionPart">
      <div class="header">
          <img src="../assets/Room-Selection.png" alt="">
      </div>
      <div class="name-Create">
          <div class="introduction">
              <p>Hello, {{$store.state.userName}}</p>
              <p style="margin:0;">Please select a room or create a new one</p>
              <div>
              <input type="text" style="border-radius:17px;padding:1%;margin-right:1%;" v-model="createRoomName">
              <button style="border-radius:17px;">Create</button>
              </div>
          </div>
      </div>
      <b-row align-h="center" cols="5" class="forRooms m-5">
          <RoomCards></RoomCards>
      </b-row>
  </div>
</template>

<script>
import RoomCards from '../components/RoomCards.vue'
export default {
  name: 'RoomSelection',
  data () {
    return {
        createRoomName: ''
    }
  },
  components: {
    RoomCards
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Squada+One&display=swap');
@keyframes fadeIn {
    0% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
}
.forRooms {
    overflow: scroll;
    animation: 1s ease-out 0s 1 fadeIn;
}
.introduction {
    font-family: 'Squada One', cursive;
    text-align: center;
    color: white;
    font-size: 2em;
    font-weight: 500;
    width: 30%;
    background-image: url('../assets/boxs.png');
    background-size: 100%;
    background-repeat: no-repeat;
    padding-top: 1%;
}
.name-Create {
    animation: 1s ease-out 0s 1 fadeIn;
    height: 25%;
    width: 100%;
    display: flex;
    justify-content: center;
}
.header {
    animation: 1s ease-out 0s 1 fadeIn;
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.RoomSelectionPart {
    margin: 0;
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/startWallpaper.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 100%;
}
</style>
