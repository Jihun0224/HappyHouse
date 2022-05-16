<template>
  <div id="app">
    <HeaderNav />
    <router-view />
    <FixedFooter />
  </div>
</template>
<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
import FixedFooter from "@/components/common/FixedFooter.vue";

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
