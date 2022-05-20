<template>
  <div id="search">
    <div class="container px-4 px-lg-5">
      <div class="title"><h1>Search</h1></div>
      <div class="select-box-wrap">
        <div class="select-box">
          <div style="background: #fff">
            <v-select
              v-model="sidoCode"
              :options="sidos"
              @input="gugunList"
              id="select"
            />
          </div>
          <div style="background: #fff">
            <v-select
              v-model="gugunCode"
              :options="guguns"
              @input="DongList"
              id="select"
            />
          </div>
          <div style="background: #fff">
            <v-select v-model="dongCode" :options="dongs" id="select" />
          </div>
          <b-button id="home-search-button" @click="searchApt">검색</b-button>
        </div>
      </div>
      <KakaoMap />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import KakaoMap from "@/components/House/KakaoMap.vue";
const houseStore = "houseStore";

export default {
  components: {
    KakaoMap,
  },
  data() {
    return {
      sidoCode: "시·도를 선택해주세요.",
      gugunCode: "시·군·구를 선택해주세요.",
      dongCode: "읍·면·동을 선택해주세요.",
    };
  },
  computed: {
    ...mapState(houseStore, [
      "center",
      "sidos",
      "guguns",
      "dongs",
      "selectedArea",
    ]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "SET_SELECTEDAREA",
      "SET_CENTER",
      "SET_CNTUP",
    ]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.gugunCode = null;
      if (this.sidoCode.value) this.getGugun(this.sidoCode.value);
    },
    DongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode.value) this.getDong(this.gugunCode.value);
    },
    searchApt() {
      if (this.dongCode.value) {
        const searchedArea = {
          sido: { value: this.sidoCode.value, label: this.sidoCode.label },
          gugun: { value: this.gugunCode.value, label: this.gugunCode.label },
          dong: { value: this.dongCode.value, label: this.dongCode.label },
        };
        this.SET_SELECTEDAREA(searchedArea);
        var coords = {
          lat: this.dongCode.lat,
          lng: this.dongCode.lng,
        };
        this.SET_CENTER(coords);
        this.SET_CNTUP();
        this.$router.push("/house");
      }
    },
  },
};
</script>

<style scoped>
#search {
  height: 95vh;
  background-color: #f5f8fd;
}
#search #map-wrap {
  height: 60vh;
}
.select-box {
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-around;
}
#select {
  width: 270px;
  height: 30px;
}
#home-search-button {
  height: 37px;
  background-color: #413e66;
}
h1 {
  text-align: center;
  color: #413e66;
  font-size: 6vh;
  padding-top: 6vh;
}
#map {
  height: 60vh;
}
</style>