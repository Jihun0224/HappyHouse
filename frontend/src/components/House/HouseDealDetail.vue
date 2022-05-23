<template>
  <b-modal
    v-model="isSelectedHouse"
    v-if="getSelectedHouse"
    id="deal-detail"
    title="상세정보"
    @close="closeModal"
    @ok="closeModal"
    ok-only
  >
    <HouseDetailChart />
    <div class="row my-1">
      <span class="infoKey col-4">아파트명</span>
      <span class="infoValue">{{ getSelectedHouse.aptName }}</span>
    </div>
    <div class="row my-1">
      <span class="infoKey col-4">건축년도</span>
      <span class="infoValue">{{ getSelectedHouse.buildYear }}</span>
    </div>
    <div class="row my-1">
      <span class="infoKey col-4">주소</span>
      <span class="infoValue">{{
        getSelectedHouse.sidoName +
        " " +
        getSelectedHouse.gugunName +
        " " +
        getSelectedHouse.jibun
      }}</span>
    </div>
    <div class="row my-1">
      <span class="infoKey col-4">최신거래금액</span>
      <span class="infoValue">{{ getSelectedHouse.recentPrice }}</span>
    </div>

    <b-button type="submit" @click="setmyhome">마이홈 등록</b-button>
  </b-modal>
</template>

<script>
import HouseDetailChart from "@/components/House/HouseDetailChart.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
const houseStore = "houseStore";
const memberStore = "memberStore";
export default {
  name: "HouseDealDetail",
  components: {
    HouseDetailChart,
  },
  data() {
    return {
      user: {
        myhome: null,
      },
    };
  },
  computed: {
    ...mapState(houseStore, ["selectedHouse", "isSelectedHouse"]),
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(houseStore, ["getIsSelectedHouse", "getSelectedHouse"]),
    isSelectedHouse: {
      get() {
        return this.getIsSelectedHouse;
      },
      set(bool) {
        return bool;
      },
    },
  },
  methods: {
    ...mapMutations(houseStore, ["SET_SELECTEDHOUSE", "SET_ISSELECTEDHOUSE"]),
    ...mapActions(memberStore, ["setMyhome"]),

    setmyhome() {
      this.setMyhome(this.user);
      console.log(this.user.myhome);
    },
    closeModal() {
      this.SET_SELECTEDHOUSE(null);
      this.SET_ISSELECTEDHOUSE(false);
    },
  },
  created() {
    this.user = this.userInfo;
    console.log(this.isSelectedHouse);
    console.log(this.selectedHouse);
    this.user.myhome = this.selectedHouse.aptCode;
  },
};
</script>

<style></style>
