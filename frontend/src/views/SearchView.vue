<template>
  <div>
    <HeaderNav />
    <container class="search">
      <SearchResult />
      <KakaoMap />
    </container>
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
.search {
  height: 100vh;
  width: 100%;
}
#map {
  height: 100vh;
  width: 80%;
  float: right;
}
#mainNav {
  background-color: #f5f8fd;
}
#result {
  position: relative;
  top: 88px;
  width: 20vw;
}
</style>