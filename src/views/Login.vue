<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Login</h1>
      <h2 class="subtitle">Login to access cool features.</h2>
      <div
        class="notification is-danger"
        v-if="loginFailed && !isChanged"
      >Failed to log in. Incorrect username or password?</div>
      <form class="form" @submit.prevent="submitLogin">
        <div class="field">
          <label for class="label">Username</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Username"
              v-model="username"
              name="username"
              autocomplete="username"
            >
          </div>
        </div>
        <div class="field">
          <label for class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="Password"
              placeholder="Password"
              v-model="password"
              autocomplete="password"
              name="password"
            >
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button
              :disabled="loginDisabled"
              type="submit"
              class="button is-link"
              value="Login"
            >Login</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    inProgress: false,
    loginFailed: false,
    lastCredentials: null
  }),
  computed: {
    isChanged() {
      if (this.lastCredentials) {
        return (
          this.lastCredentials.username !== this.username ||
          this.lastCredentials.password !== this.password
        )
      }
      return this.username !== "" && this.password !== ""
    },
    loginDisabled() {
      return this.inProgress || !this.isChanged
    }
  },
  methods: {
    clearForm() {
      this.username = ""
      this.password = ""
    },
    submitLogin() {
      this.loginFailed = false
      this.inProgress = true
      this.lastCredentials = {
        username: this.username,
        password: this.password
      }
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "home" })
        })
        .catch((err) => {
          console.log(err)
          this.loginFailed = true
        })
        .finally(() => {
          this.inProgress = false
        })
    }
  }
}
</script>
