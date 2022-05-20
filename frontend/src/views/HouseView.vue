<template>
  <div id="HouseView">
    <HeaderNav />
    <div class="container-fluid">
      <div class="row">
        <HouseSearchResult />
        <KakaoMap :key="centerChangeCnt" />
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/components/House/KakaoMap.vue";
import HeaderNav from "@/components/common/HeaderNav.vue";
import HouseSearchResult from "@/components/House/HouseSearchResult.vue";
import { mapState } from "vuex";
const houseStore = "houseStore";
export default {
  components: {
    KakaoMap,
    HeaderNav,
    HouseSearchResult,
  },
  computed: {
    ...mapState(houseStore, ["centerChangeCnt"]),
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
