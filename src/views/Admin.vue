<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Admin panel</h1>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "Admin",
  computed: mapState({
    isLoggedIn: state => state.isLoggedIn
  })
}
</script>
