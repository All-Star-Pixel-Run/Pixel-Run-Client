<template>
  <b-col cols="2" class="room m-2">
      <div class="cardContent">
          <h3>{{roomDetails.name}}</h3>
          <button class="selectRoomButton" @click="joinRoom(roomDetails.name)">Select</button>
      </div>
  </b-col>
</template>

<script>
export default {
  name: 'RoomCard',
  props: {
    roomDetails: {
      type: Object
    }
  },
  methods: {
    joinRoom (roomName) {
      this.$socket.emit('join', {
        id: localStorage.getItem('id'),
        roomId: roomName
      })
      this.$router.push(`/loading/${roomName}`)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Squada+One&display=swap');
.selectRoomButton {
    font-family: 'Squada One', cursive;
    border-radius: 10px;
    height: 5vh;
    width: 5vw;
}
.room {
  height: 15vh;
  background-image: url('../assets/roomBox.png');
  border-radius: 17px;
  background-size: contain;
  background-repeat: no-repeat;
  padding: 1%;
}
.cardContent {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
