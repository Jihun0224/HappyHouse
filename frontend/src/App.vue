<template>
  <div id="app">
    <router-view />
    <FixedFooter />
  </div>
</template>
<script>
import FixedFooter from "@/components/common/FixedFooter.vue";

export default {
  name: "App",
  components: {
    FixedFooter,
  },
};
</script>

<style scoped>
#app {
  min-height: 100%;
}
</style>
