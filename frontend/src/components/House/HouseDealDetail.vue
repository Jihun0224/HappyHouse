<template>
  <!-- [문제]
   모달창 꺼질때 state 변경,
   최초 클릭만 모달창 뜸 
  -->
  <b-modal
    v-model="isSelectedHouse"
    v-if="selectedHouse"
    id="deal-detail"
    title="상세정보"
  >
    <div class="row my-1">
      <span class="infoKey col-4">아파트명</span>
      <span class="infoValue">{{ selectedHouse.aptName }}</span>
    </div>
    <div class="row my-1">
      <span class="infoKey col-4">건축년도</span>
      <span class="infoValue">{{ selectedHouse.buildYear }}</span>
    </div>
    <div class="row my-1">
      <span class="infoKey col-4">주소</span>
      <span class="infoValue">{{
        selectedHouse.sidoName +
        " " +
        selectedHouse.gugunName +
        " " +
        selectedHouse.jibun
      }}</span>
    </div>
    <div class="row my-1">
      <span class="infoKey col-4">최신거래금액</span>
      <span class="infoValue">{{ selectedHouse.recentPrice }}</span>
    </div>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseDealDetail",
  computed: {
    ...mapState(houseStore, ["selectedHouse", "isSelectedHouse"]),
  },
  methods: {
    ...mapMutations(houseStore, ["SET_SELECTEDHOUSE", "SET_ISSELECTEDHOUSE"]),
  },
  created() {
    console.log(this.isSelectedHouse);
    console.log(this.selectedHouse);
  },
};
</script>

<style></style>
