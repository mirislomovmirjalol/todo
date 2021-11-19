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
            Register
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <form @submit.prevent="register()">
      <div class="col-12 col-md-6 mx-auto">
        <v-text-field
            v-model="form.name"
            :error-messages="errors.name[0]"
            label="Name"
            required
            outlined
            color="indigo"
        >
        </v-text-field>
        <v-text-field
            v-model="form.email"
            :error-messages="errors.email[0]"
            label="Email"
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
            required
            type="password"
            outlined
            color="indigo"
        >
        </v-text-field>
        <v-text-field
            v-model="form.password_confirmation"
            :error-messages="errors.password_confirmation[0]"
            label="Password Confirm"
            required
            type="password"
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
          <span v-if="!loading">Register</span>
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
      name: "",
      email: '',
      password: '',
      password_confirmation: '',
    },
    errors: {
      name: [],
      email: [],
      password: [],
      password_confirmation: [],
      message: null,
    },
    loading: false,
  }),
  methods: {
    register() {
      this.loading = true
      this.$store.dispatch('register', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
      })
          .then(response => {
            this.$router.push({name: 'todo'})
          })
          .catch(error => {
            if (error.response.data.errors.name) {
              this.errors.name = error.response.data.errors.name
            }
            if (error.response.data.errors.email) {
              this.errors.email = error.response.data.errors.email
            }
            if (error.response.data.errors.password) {
              this.errors.password = error.response.data.errors.password
            }
            if (error.response.data.errors.password_confirmation) {
              this.errors.password_confirmation = error.response.data.errors.password_confirmation
            }
            this.loading = false
          })
    },
  },
}
</script>
