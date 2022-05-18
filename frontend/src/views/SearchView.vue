<template>
  <div>
    <HeaderNav />
    <div class="container-fluid">
      <div class="row">
        <SearchResult />
        <KakaoMap />
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/components/Search/KakaoMap.vue";
import HeaderNav from "@/components/common/HeaderNav.vue";
import SearchResult from "@/components/Search/SearchResult.vue";

export default {
  components: {
    KakaoMap,
    HeaderNav,
    SearchResult,
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