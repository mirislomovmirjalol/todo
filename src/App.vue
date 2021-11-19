<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        class="indigo"
        dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            To Do App
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >

        <v-list-item
            v-if="loggedIn"
            :to="'/todo'"
            link
        >
          <v-list-item-icon>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Todo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            :to="'/account'"
            link
            v-if="!loggedIn"
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            :to="'/about'"
            link
        >
          <v-list-item-icon>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-if="loggedIn" v-slot:append>
        <div class="pa-6">
          <v-btn link to="/logout" block color="white" light>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
        app
        class="indigo--text font-weight-medium white"
        elevate-on-scroll
    >
      <v-app-bar-nav-icon class="indigo--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn
          v-if="$route.path.includes('/todo')"
          icon
          @click="reloadPage()"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-menu
          top
          transition="slide-y-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="(item, index) in dropdownItems"
              :key="index"
              link
              target="_blank"
              :href="item.link"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>


    <v-main colo>
      <v-container>
        <router-view>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {

  data: () => ({
    drawer: null,
    dropdownItems: [
      {title: 'Sent me FeedBack', link: 'mailto:mirislomovmirjalol@gmail.com'},
      {title: 'Buy me a Coffee', link: 'https://www.buymeacoffee.com/mirjalol'},
    ],
  }),
  computed: {
    loggedIn(state) {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    reloadPage() {
      this.$store.dispatch('retrieveTodos');
    }
  },
}
</script>

<style>
</style>