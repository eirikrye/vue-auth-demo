<template>
  <div class="card is-dark">
    <div class="card-header">
      <div class="card-header-title is-centered">{{ profile.fullName }}'s profile</div>
    </div>
    <div class="card-image">
      <figure class="image is-4by2">
        <img :src="animalImage" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <p>My name is
        <strong>{{ profile.fullName }}</strong>. My favourite animal is the
        <strong>{{ lowercaseAnimal }}</strong>.</p>
        <p v-if="lovesDogs">I primarily enjoy their waggly tails.</p>
        <p v-if="lovesBirds">I an enthralled by their feathers.</p>
        <p v-if="lovesCats">I like that they provide no affection.</p>
        <p v-if="lovesSloths">Just look at this guy 😋</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileCard",
  props: {
    profile: Object
  },
  computed: {
    lovesDogs() {
      return this.lowercaseAnimal === 'dog'
    },
    lovesCats() {
      return this.lowercaseAnimal === 'cat'
    },
    lovesBirds() {
      return this.lowercaseAnimal === 'bird'
    },
    lovesSloths() {
      return this.lowercaseAnimal === 'sloth'
    },
    lowercaseAnimal() {
      return this.profile.favouriteAnimal.toLowerCase()
    },
    animalImage() {
      return require("@/assets/animals/" + this.lowercaseAnimal + ".jpg")
    }
  }
}
</script>
