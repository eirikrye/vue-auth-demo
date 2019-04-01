<template>
  <aside class="notification-inbox">
    <transition-group name="slide-fade" mode="out-in">
      <Notification
        :key="notification.uuid"
        :notification="notification"
        v-for="notification in activeNotifications"
      />
    </transition-group>
  </aside>
</template>
<script>
import Notification from "./Notification.vue"

export default {
  computed: {
    activeNotifications() {
      return this.$store.state.notifications
    }
  },
  components: { Notification }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 1s;
}
</style>
