<template>
  <div>
      <h1>PLAY</h1>
  </div>
</template>

<script>
export default {
 created () {
    this.$store.commit('PAUSE_MENU')
    this.$store.commit('PLAY_RACE')
 }
}
</script>

<style>

</style>