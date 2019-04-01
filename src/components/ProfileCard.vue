<template>
  <div class="card is-dark">
    <div class="card-header">
      <div class="card-header-title is-centered">
        {{ profile.fullName }}'s profile
      </div>
    </div>
    <div class="card-image">
      <figure class="image is-4by2">
        <img :src="animalImage" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        My name is <strong>{{ profile.fullName }}</strong
        >. My favourite animal is the
        <strong> {{ lowercaseAnimal }}</strong
        >.
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item"
        ><span
          ><font-awesome-icon :icon="['fab', 'twitter']" /> Twitter</span
        ></a
      >
      <a href="#" class="card-footer-item"
        ><span><font-awesome-icon icon="envelope" /> E-mail</span></a
      >
    </footer>
  </div>
</template>
<script>
export default {
  name: "ProfileCard",
  props: {
    profile: Object
  },
  computed: {
    lowercaseAnimal() {
      return this.profile.favouriteAnimal.toLowerCase()
    },
    animalImage() {
      return "/images/" + this.lowercaseAnimal + ".jpg"
    }
  }
}
</script>
