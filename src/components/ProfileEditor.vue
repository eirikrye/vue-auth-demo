<template>
<div>
  <form @submit.prevent="emitProfile" @input.prevent="previewProfile">
    <div class="field">
      <label for class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Username"
          v-model="fullName"
        />
      </div>
    </div>
    <div class="field">
      <label for class="label">Favourite animal</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="favouriteAnimal">
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
        <button class="button is-link" type="submit">Save</button>
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
      fullName: this.profile.fullName,
      favouriteAnimal: this.profile.favouriteAnimal
    }
  },
  methods: {
    emitProfile() {
      this.$emit('profileUpdated', this.$data)
    },
    previewProfile() {
      this.$emit('profilePreview', this.$data)
    }
  }
}
</script>
