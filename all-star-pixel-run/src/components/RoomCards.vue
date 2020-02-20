<template>
  <b-col cols="2" class="room m-2">
      <div class="cardContent">
          <h3>ROOM NAME</h3>
          <button>Select</button>
      </div>
  </b-col>
</template>

<script>
export default {
  name: 'RoomCard'
}
</script>

<style scoped>
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
    text-align: center;
}
</style>
