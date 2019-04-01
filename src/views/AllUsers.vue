<template>
  <section class="section">
    <div class="container">
      <h1 class="title">All users</h1>
      <div class="columns is-multiline" v-if="hasUsers">
        <div :key="user.username" class="column is-one-third" v-for="user in users">
          <ProfileCard :profile="user.profile"/>
        </div>
      </div>
      <Spinner v-else/>
    </div>
  </section>
</template>
<script>
import ProfileCard from "@/components/ProfileCard"
import Spinner from "@/components/Spinner"
import { API } from "../api"

export default {
  name: "AllUsers",
  components: { ProfileCard, Spinner },
  data() {
    return {
      users: []
    }
  },
  computed: {
    hasUsers() {
      return this.users.length > 0
    }
  },
  async created() {
    this.$store.commit("incLoading")
    try {
      let response = await API.get("/users")
      this.users = response.data
    } catch (err) {
      console.log(err)
    } finally {
      this.$store.commit("subLoading")
    }
  }
}
</script>
