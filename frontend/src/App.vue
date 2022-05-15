<template>
  <div id="app">
    <HeaderNav />
    <router-view />
    <FixedFooter />
  </div>
</template>
<script>
import HeaderNav from "@/components/HeaderNav.vue";
import FixedFooter from "@/components/FixedFooter.vue";

export default {
  name: "App",
  components: {
    HeaderNav,
    FixedFooter,
  },
};
</script>

<style>
#app {
  min-height: 100%;
}
</style>
