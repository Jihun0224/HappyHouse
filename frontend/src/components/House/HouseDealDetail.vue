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
  </b-modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseDealDetail",
  computed: {
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
    closeModal() {
      this.SET_SELECTEDHOUSE(null);
      this.SET_ISSELECTEDHOUSE(false);
    },
  },
};
</script>

<style></style>
