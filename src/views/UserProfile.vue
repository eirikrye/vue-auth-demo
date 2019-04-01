<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My profile</h1>
      <div class="columns">
        <div class="column is-half">
          <h2 class="title is-4">Edit</h2>
          <ProfileEditor @profilePreview="previewProfile" :profile="userProfile" v-if="hasProfile"/>
            <Spinner v-else />
        </div>
        <div class="column is-half">
          <h2 class="title is-4">Preview</h2>
          <ProfileCard :profile="shownProfile" v-if="hasProfile"/>
          <Spinner v-else />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from "vuex"
import ProfileCard from "@/components/ProfileCard"
import ProfileEditor from "@/components/ProfileEditor"
import Spinner from "@/components/Spinner"

export default {
  name: "UserProfile",
  components: { ProfileCard, ProfileEditor, Spinner },
  data() {
    return {
      newProfile: null
    }
  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile
    }),
    ...mapGetters(["hasProfile"]),
    shownProfile() {
      return this.newProfile || this.userProfile
    }
  },
  methods: {
    previewProfile(newProfile) {
      this.newProfile = newProfile
    }
  }
}
</script>
