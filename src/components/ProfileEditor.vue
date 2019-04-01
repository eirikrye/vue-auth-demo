<template>
  <div>
    <form @input.prevent="previewProfile" @submit.prevent="saveProfile">
      <div class="field">
        <label for class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Username" v-model="editedProfile.fullName">
        </div>
      </div>
      <div class="field">
        <label for class="label">Favourite animal</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="editedProfile.favouriteAnimal">
              <option value="Bird">Bird</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Sloth">Sloth</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" type="submit" :disabled="!dirty">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "ProfileEditor",
  props: {
    profile: Object
  },
  data() {
    return {
      dirty: false,
      saved: false,
      editedProfile: {
        fullName: this.profile.fullName,
        favouriteAnimal: this.profile.favouriteAnimal
      }
    }
  },
  computed: {
    saveText() {
      return !this.saved ? "Save" : "Saved!"
    }
  },
  methods: {
    saveProfile() {
      this.$store.dispatch("updateProfile", this.editedProfile).then(() => {
        this.saved = true
      })
      this.dirty = false
    },
    previewProfile() {
      this.dirty = true
      this.saved = false
      this.$emit("profilePreview", this.editedProfile)
    }
  }
}
</script>
