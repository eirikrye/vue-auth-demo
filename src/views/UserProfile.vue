<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My profile</h1>
      <div class="columns">
        <div class="column">
          <h2 class="title is-4">Preview</h2>
          <ProfileCard :profile="shownProfile" v-if="hasProfile" />
          <div class="has-text-centered" v-else>
            <font-awesome-icon
              class="has-text-centered"
              icon="spinner"
              size="2x"
              spin
              fixed-width
            />
          </div>
        </div>
        <div class="column">
          <h2 class="title is-4">Edit profile</h2>
          <ProfileEditor
            @profileUpdated="updateProfile"
            @profilePreview="previewProfile"
            :profile="userProfile"
            v-if="hasProfile"
          />
          <div class="has-text-centered" v-else>
            <font-awesome-icon
              class="has-text-centered"
              icon="spinner"
              size="2x"
              spin
              fixed-width
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters } from "vuex"
import ProfileCard from "@/components/ProfileCard"
import ProfileEditor from "@/components/ProfileEditor"
export default {
  name: "UserProfile",
  components: { ProfileCard, ProfileEditor },
  data () {
    return {
      newProfile: null
    }
  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile
    }),
    ...mapGetters(["hasProfile"]),
    shownProfile () {
      return this.newProfile || this.userProfile
    }
  },
  methods: {
    updateProfile(newProfile) {
      this.$store.dispatch("updateProfile", newProfile).then(() => {
        this.newProfile = null
      })
    },
    previewProfile(newProfile) {
      this.newProfile = newProfile
    }
  }
}
</script>
