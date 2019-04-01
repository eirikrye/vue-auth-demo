<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <router-link :to="{ name: 'home' }" class="navbar-item">Vue Auth Demo</router-link>
          <div class="navbar-burger" ref="navbarBurger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div class="navbar-menu" ref="navbarMenu">
          <div class="navbar-start" v-if="isLoggedIn && hasProfile">
            <router-link :to="{ name: 'users' }" class="navbar-item">
              <font-awesome-icon icon="users" fixed-width/>&nbsp;All Users
            </router-link>
            <router-link :to="{ name: 'admin' }" class="navbar-item" v-if="isAdmin">
              <font-awesome-icon icon="user-secret" fixed-width/>&nbsp;Admin
              Panel
            </router-link>
          </div>
          <div class="navbar-end" v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }" class="navbar-item">
              <span>
                <font-awesome-icon icon="sign-in-alt" fixed-width/>&nbsp;Log in
              </span>
            </router-link>
          </div>
          <div class="navbar-end" v-if="isLoggedIn">
            <router-link v-if="hasProfile" :to="{ name: 'profile' }" class="navbar-item">
              <font-awesome-icon icon="user" fixed-width/>&nbsp;Profile
              <span v-if="hasProfile">&nbsp;({{ username }})</span>
            </router-link>
            <a @click="logoutUser" class="navbar-item">
              <span>
                <font-awesome-icon icon="sign-out-alt" fixed-width/>&nbsp;Log
                out
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <NotificationBox/>
    <progress v-if="isLoading" class="progress is-info loading-bar"/>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex"
import NotificationBox from "@/components/NotificationBox"

export default {
  components: { NotificationBox },
  computed: {
    ...mapGetters(["isLoading", "hasProfile", "isAdmin", "isLoggedIn"]),
    ...mapState({
      username: state => state.username,
      fullName: state => state.userProfile && state.userProfile.fullName
    })
  },
  mounted() {
    this.setupMenu()
  },
  methods: {
    closeMenu() {
      let burger = this.$refs.navbarBurger
      let menu = this.$refs.navbarMenu
      menu.classList.remove("is-active")
      burger.classList.remove("is-active")
    },
    setupMenu() {
      let burger = this.$refs.navbarBurger
      let menu = this.$refs.navbarMenu
      burger.addEventListener("click", () => {
        burger.classList.toggle("is-active")
        menu.classList.toggle("is-active")
      })
    },
    logoutUser() {
      this.$store.commit("logoutUser")
    }
  },
  watch: {
    "$store.state.isLoggedIn": function(isLoggedIn) {
      if (!isLoggedIn) {
        this.$router.push({ name: "login" })
        this.$store.commit("addNotification", {
          severity: "warning",
          contents: "You have been logged out."
        })
      }
    },
    $route: function() {
      this.closeMenu()
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

.notification-inbox {
  z-index: 10;
  position: fixed;
  width: 300px;
  margin-top: 1rem;
  max-height: 100%;
  right: 1rem;
}
aside.notification-inbox > .notification {
  margin-bottom: 0.8rem;
}
</style>
