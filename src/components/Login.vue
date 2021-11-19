<template>
  <div>
    <v-container>
      <v-alert
          v-if="errors.message"
          dense
          border="left"
          type="error"
      >
        {{ errors.message }}
      </v-alert>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="my-5 font-weight-medium indigo--text">
            Login
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <form @submit.prevent="login()">
      <div class="col-12 col-md-6 mx-auto">
        <v-text-field
            v-model="form.username"
            :error-messages="errors.username[0]"
            label="Username"
            type="email"
            required
            outlined
            color="indigo"
        >
        </v-text-field>
        <v-text-field
            v-model="form.password"
            :error-messages="errors.password[0]"
            label="Password"
            type="password"
            required
            outlined
            color="indigo"
        >
        </v-text-field>
        <v-btn
            block
            class="text-end"
            type="submit"

            depressed
            color="indigo"
            dark
        >
          <span v-if="!loading">Login</span>
          <v-progress-linear v-if="loading" color="white" indeterminate></v-progress-linear>
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data: () => ({
    form: {
      username: '',
      password: '',
    },
    errors: {
      username: [],
      password: [],
      message: null,
    },
    loading: false,
  }),
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        username: this.form.username,
        password: this.form.password,
      })
          .then(response => {
            this.$router.push({name: 'todo'})
          })
          .catch(error => {
            this.errors.message = error
            this.loading = false
          })
    },
  },
}
</script>
