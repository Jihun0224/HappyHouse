<template>
  <div class="home">
    <HeaderNav />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "HomeView",
  components: {
    HeaderNav,
  },
};
</script>
