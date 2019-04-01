<template>
  <section class="hero is-fullheight-with-navbar" :class="{'is-link': isLoggedIn, 'is-dark': !isLoggedIn}">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Vue Auth Demo</h1>
        <h2 class="subtitle">Vue demonstration using a backend API for authentication.</h2>
        <p class="subtitle is-6" v-if="isLoggedIn">
          You are currently
          <strong>logged in</strong>. Why not check out
          <router-link :to="'login'">
            <strong>your profile</strong>
          </router-link>?
        </p>
        <p class="subtitle is-6" v-else>
          You are not logged in.
          <router-link :to="'login'">Log in now</router-link>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "Home",
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn
  })
}
</script>
<style scoped>
section.hero a {
  text-decoration: underline;
}
</style>
