<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Vue Auth Demo</h1>
        <h2 class="subtitle">Vue demonstration using a backend API for authentication.</h2>
        <p v-if="isLoggedIn">
          You are currently
          <strong>logged in</strong>.
          Why not check out <router-link :to="'login'" class="has-text-underline"><strong>your profile</strong></router-link>?
        </p>
        <p v-else>
          You are not logged in.
          <router-link :to="'login'" tag="button" class="button is-primary is-small">Log in now</router-link>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn
  })
};
</script>
