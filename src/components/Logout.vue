<template>
  <v-overlay opacity="0.3">
    <v-progress-circular
        indeterminate
        color="indigo "
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('destroyToken')
        .then(response => {
          this.$router.push({name: 'Account'})
        })
        .catch(error => {
          console.log(error)
        })
  }
}
</script>

<style scoped>

</style>