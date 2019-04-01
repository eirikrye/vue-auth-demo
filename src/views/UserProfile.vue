<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My profile</h1>
      <div class="columns">
        <div class="column">
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="content">
          Your name is {{profile.name}}. Your favourite animal is
    </div>
  </div>
</div>
        </div>
        <div class="column">
          <h2 class="title is-4">Edit profile</h2>
          <form class="form" @submit.prevent="submitLogin">
            <div class="field">
              <label for class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Username"
                  :value="profile.name"
                  @input="newName=$event.target.value"
                >
              </div>
              <div class="control">
                <div class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <pre>{{profile}}</pre>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  data() {
    return {
      newName: ""
    };
  },
  beforeMount () {
    this.$store.dispatch('getProfile')
  },
  computed: {
    ...mapState({
      profile: state => state.profile
    }),
    hey: () => {
      return "hey";
    }
  }
};
</script>
