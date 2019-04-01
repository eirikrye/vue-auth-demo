<template>
  <div class="notification" :class="notificationClasses">
    <button class="delete" @click="dismissNotification"></button>
    {{notification.contents}}
  </div>
</template>
<script>
export default {
  props: {
    notification: Object
  },
  methods: {
    dismissNotification() {
      let uuid = this.notification.uuid
      this.$store.commit("dismissNotification", uuid)
    }
  },
  created() {
    setTimeout(() => {
      this.dismissNotification()
    }, 3000)
  },
  computed: {
    notificationClasses() {
      let severity = this.notification.severity
      return {
        'is-success': severity === 'success',
        'is-danger': severity === 'danger',
        'is-warning': severity === 'warning'
      }
    }
  }
}
</script>
<style scoped>
  .notification {
    opacity: 0.9;
    border-style: solid;
    border-color: #4a4a4a;
    border-width: 1px;
  }
</style>
