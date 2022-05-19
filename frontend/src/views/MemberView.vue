<template>
  <div>
    <HeaderNav />
    <div>
      <b-container class="bv-example-row mt-3 text-center">
        <!-- <h3 class="underline-steelblue">
        <b-icon icon="person-lines-fill"></b-icon> Member Service
      </h3> -->
        <router-view></router-view>
      </b-container>
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";

export default {
  name: "MemberView",
  components: {
    HeaderNav,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
