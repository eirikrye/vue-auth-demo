<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">Vue Auth Demo</router-link>
          <div class="navbar-burger" data-target="main-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div class="navbar-menu" id="main-menu">
          <div class="navbar-start" v-if="isLoggedIn && hasProfile">
            <router-link :to="'profile'" class="navbar-item">My Profile</router-link>
            <router-link :to="'admin'" class="navbar-item" v-if="isAdmin">Admin Panel</router-link>
          </div>
          <div class="navbar-end" v-if="!isLoggedIn">
            <router-link :to="'login'" class="navbar-item">
              <span>
                <font-awesome-icon icon="sign-in-alt" fixed-width/>&nbsp;Log in
              </span>
            </router-link>
          </div>
          <div class="navbar-end" v-if="isLoggedIn">
            <div class="navbar-item">
              <span v-if="hasProfile">Logged in as: {{username}}</span>
              <font-awesome-icon icon="spinner" spin fixed-width v-else/>
            </div>
            <a @click="logoutUser" class="navbar-item">
              <span>
                <font-awesome-icon icon="sign-out-alt" fixed-width/>&nbsp;Log out
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <progress v-if="loading" class="progress is-info" style="position: absolute; border-radius: 0; height: 4px;" />
    <router-view/>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      isAdmin: state => state.profile.admin || false,
      username: state => state.profile.name,
      hasProfile: state => state.isProfileLoaded,
      loading: state => state.loading
    })
  },
  created() {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  },
  methods: {
    logoutUser() {
      this.$store.commit("logoutUser");
      this.$router.push({name: 'login'})
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:400,700");
$family-sans-serif: "Nunito", sans-serif;
@import "~bulma";

</style>
