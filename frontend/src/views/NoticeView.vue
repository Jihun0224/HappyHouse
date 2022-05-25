<template>
  <div>
    <HeaderNav />
    <b-container id="body" class="bv-example-row mt-3 text-center pt-5">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";

export default {
  name: "NoticeView",
  components: {
    HeaderNav,
  },
};
</script>

<style></style>
