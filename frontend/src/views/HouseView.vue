<template>
  <div>
    <HeaderNav />
    <div class="container-fluid">
      <div class="row">
        <HouseSearchResult />
        <KakaoMap />
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/components/House/KakaoMap.vue";
import HeaderNav from "@/components/common/HeaderNav.vue";
import HouseSearchResult from "@/components/House/HouseSearchResult.vue";

export default {
  components: {
    KakaoMap,
    HeaderNav,
    HouseSearchResult,
  },
};
</script>
<style scoped>
#map {
  height: 100vh;
  width: 80%;
  float: right;
}
#mainNav {
  background-color: #f5f8fd;
}
</style>
