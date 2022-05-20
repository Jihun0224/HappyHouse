<template>
  <div class="search-result">
    <div class="search-result-top">
      <div class="search-result-title"><b-icon icon="search"></b-icon>검색</div>
    </div>
    <div class="search-result-body">
      <div class="search-result-options">
        <div class="option">
          <div class="option_title">시도</div>
          <div class="option_select">
            <v-select
              v-model="sidoCode"
              :options="sidos"
              @input="gugunList"
              id="select"
            />
          </div>
        </div>
        <div class="option">
          <div class="option_title">시군구</div>
          <div class="option_select">
            <v-select
              v-model="gugunCode"
              :options="guguns"
              @input="DongList"
              id="select"
            />
          </div>
        </div>
        <div class="option">
          <div class="option_title">읍면동</div>
          <div class="option_select">
            <v-select v-model="dongCode" :options="dongs" id="select" />
          </div>
        </div>
        <div class="option_input_type">
          <div class="option_title">아파트명</div>
          <div class="option_input">
            <b-input-group>
              <b-form-input style="background-color: #f5f8fd"></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="serch-btn-div">
          <b-button id="search-button" @click="searchApt">검색</b-button>
        </div>
      </div>

      <div class="search-result-body-result">
        <div class="search-result-body-result-top">
          <div class="search-result-title">
            <b-icon icon="list-task"></b-icon>검색 결과
          </div>
          <div class="search-result-list">
            <ResultNotFound v-if="isEmpty" />
            <HouseList v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import HouseList from "@/components/House/HouseList.vue";
import ResultNotFound from "@/components/House/ResultNotFound.vue";
const houseStore = "houseStore";

export default {
  components: {
    HouseList,
    ResultNotFound,
  },
  data() {
    return {
      sidoCode: "시·도",
      gugunCode: "시·군·구",
      dongCode: "읍·면·동",
    };
  },
  computed: {
    ...mapState(houseStore, [
      "sidos",
      "guguns",
      "dongs",
      "selectedArea",
      "houses",
      "isEmpty",
    ]),
  },
  created() {
    if (this.selectedArea != null) {
      this.setArea();
    } else {
      this.CLEAR_HOUSE_LIST();
      this.SET_ISEMPTY(false);
      this.CLEAR_SIDO_LIST();
      this.getSido();
    }
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong", "getHouses"]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_SELECTEDAREA",
      "SET_ISEMPTY",
      "CLEAR_HOUSE_LIST",
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
        this.getHouses(this.dongCode.value);
      }
    },
    setArea() {
      const area = this.selectedArea;
      this.sidoCode = area.sido;
      this.gugunCode = area.gugun;
      this.dongCode = area.dong;
      this.getHouses(this.selectedArea.dong.value);
      if (this.houses == null) {
        this.SET_ISEMPTY(true);
      }
      this.CLEAR_SELECTEDAREA();
    },
  },
};
</script>

<style scpoed>
.search-result {
  padding-top: 88px;
  background-color: #f5f8fd;
  width: 20%;
  height: 100vh;
}
.search-result-top {
  height: 50px;
  background-color: #a3a3e8;
}
.option {
  height: 35px;
  margin-top: 10px;
  margin-left: 5px;
}
.option_input_type {
  height: 55px;
  margin-top: 10px;
  margin-left: 5px;
}
.option_title {
  float: left;
  width: 100px;
  line-height: 35px;
}
.option_select {
  width: 290px;
}

.option_input {
  width: 190px;
  float: left;
}
.search-result-title {
  color: #413e66;
  font-weight: 600;
  line-height: 50px;
  padding-left: 20px;
  margin-bottom: 0;
}
.search-result-options {
  background-color: #f5f8fd;
  height: 35%;
}
.search-result-body-result-top {
  height: 50px;
  background-color: #a3a3e8;
}
.search-result-body-result {
  background-color: #f5f8fd;
  height: 100%;
}
#search-button {
  margin: 0 auto;
  height: 37px;
  width: 150px;
  background-color: #413e66;
}
.serch-btn-div {
  height: 45px;
  display: flex;
}
</style>