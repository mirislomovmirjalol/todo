<template>
  <div>
    <v-tabs slider-color="indigo"
            grow
            color="indigo"
    >
      <v-tab href="#login">
        Login
      </v-tab>
      <v-tab href="#register">
        Register
      </v-tab>

      <v-tab-item value="login">
        <login></login>
      </v-tab-item>
      <v-tab-item value="register">
        <register></register>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";

export default {
  components: {Register, Login}
}
</script>

<style scoped>

</style>