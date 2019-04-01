<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <router-link :to="{ name: 'home' }" class="navbar-item"
            >Vue Auth Demo</router-link
          >
          <div class="navbar-burger" data-target="main-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div class="navbar-menu" id="main-menu">
          <div class="navbar-start" v-if="isLoggedIn && hasProfile">
            <router-link :to="{ name: 'users' }" class="navbar-item"
              ><font-awesome-icon
                icon="users"
                fixed-width
              />&nbsp;Users</router-link
            >
            <router-link
              :to="{ name: 'admin' }"
              class="navbar-item"
              v-if="isAdmin"
              ><font-awesome-icon icon="user-secret" fixed-width />&nbsp;Admin
              Panel</router-link
            >
          </div>
          <div class="navbar-end" v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }" class="navbar-item">
              <span>
                <font-awesome-icon icon="sign-in-alt" fixed-width />&nbsp;Log in
              </span>
            </router-link>
          </div>
          <div class="navbar-end" v-if="isLoggedIn">
            <router-link
              v-if="hasProfile"
              :to="{ name: 'profile' }"
              class="navbar-item"
            >
              <font-awesome-icon icon="user" fixed-width />
              &nbsp;Profile&nbsp;
              <sub v-if="hasProfile">({{ username }})</sub>
            </router-link>
            <a @click="logoutUser" class="navbar-item">
              <span>
                <font-awesome-icon icon="sign-out-alt" fixed-width />&nbsp;Log
                out
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <progress v-if="isLoading" class="progress is-info loading-bar" />
    <router-view />
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["isLoading", "hasProfile", "isAdmin", "isLoggedIn"]),
    ...mapState({
      username: state => state.username,
      fullName: state => state.userProfile && state.userProfile.fullName
    })
  },
  created() {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      )

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target
            const $target = document.getElementById(target)

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active")
            $target.classList.toggle("is-active")
          })
        })
      }
    })
  },
  methods: {
    logoutUser() {
      this.$store.commit("logoutUser")
      this.$router.push({ name: "login" })
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:400,700");
$family-sans-serif: "Nunito", sans-serif;
@import "~bulma";

progress.loading-bar {
  position: absolute;
  border-radius: 0;
  height: 4px;
}
</style>
