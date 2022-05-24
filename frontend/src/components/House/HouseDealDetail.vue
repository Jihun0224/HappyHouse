<template>
  <b-modal
    v-model="isSelectedHouse"
    v-if="getSelectedHouse"
    size="lg"
    id="deal-detail"
    title="상세정보"
    @close="closeModal"
    @ok="closeModal"
    ok-only
  >
    <b-tabs content-class="mt-3">
      <b-tab title="최신거래">
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
      </b-tab>
      <b-tab title="모든 거래" @click="allDealsMode">
        <div class="row my-1">
          <h5 class="col-12 text-center">{{ getSelectedHouse.aptName }}</h5>
        </div>
        <b-form class="mb-2" @submit="searchDeal" inline>
          <label class="ml-1" for="inline-form-select-key">년도 :</label>
          <b-form-select
            id="inline-form-select-key"
            class="col-2 ml-1 mb-2 mr-sm-2 mb-sm-0"
            v-model="year"
            :options="getDealYears"
            required
          ></b-form-select>
          <label class="ml-1" for="inline-form-minAmount">최소거래금액 :</label>
          <b-form-input
            id="inline-form-minAmount"
            class="col-2 ml-1 mb-2 mr-sm-2 mb-sm-0"
            v-model="minAmount"
            required
          ></b-form-input>
          <label class="ml-1" for="inline-form-maxAmount">최대거래금액 :</label>
          <b-form-input
            id="inline-form-maxAmount"
            class="col-2 ml-1 mb-2 mr-sm-2 mb-sm-0"
            v-model="maxAmount"
            required
          ></b-form-input>
          <b-button class="col-1 ml-1" type="submit" variant="outline-primary"
            >검색</b-button
          >
        </b-form>
        <all-deal-list v-bind:list="getSearchDeals"></all-deal-list>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import AllDealList from "@/components/House/AllDealList";

const houseStore = "houseStore";
const memberStore = "memberStore";
export default {
  name: "HouseDealDetail",
  data() {
    return {
      user: {
        myhome: null,
      },
      minAmount: 10000,
      maxAmount: 100000,
    };
  },
  components: {
    AllDealList,
  },
  computed: {
    ...mapState(houseStore, ["selectedHouse", "isSelectedHouse"]),
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(houseStore, [
      "getIsSelectedHouse",
      "getSelectedHouse",
      "getDealYears",
      "getInitYear",
      "getSearchDeals",
    ]),
    year: {
      get() {
        return this.getInitYear;
      },
      set(year) {
        return this.SET_INITYEAR(year);
      },
    },
    isSelectedHouse: {
      get() {
        return this.getIsSelectedHouse;
      },
      set(bool) {
        // 수정
        return bool;
      },
    },
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_SELECTEDHOUSE",
      "SET_ISSELECTEDHOUSE",
      "SET_DEALYEAR",
      "SET_INITYEAR",
      "SET_SEARCHDEAL_LIST",
    ]),
    ...mapActions(houseStore, ["getDealYearList", "getSearchDealList"]),
    ...mapActions(memberStore, ["setMyhome"]),
    setmyhome() {
      this.setMyhome(this.user);
      console.log(this.user.myhome);
    },
    closeModal() {
      this.SET_SELECTEDHOUSE(null);
      this.SET_ISSELECTEDHOUSE(false);
      this.SET_DEALYEAR(null);
      this.SET_INITYEAR(null);
      this.SET_SEARCHDEAL_LIST(null);
    },
    async allDealsMode() {
      console.log("all deals mode");
      await this.getDealYearList(this.getSelectedHouse.aptCode);
      this.getSearchDealList({
        dealYear: this.year,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
        aptCode: this.getSelectedHouse.aptCode,
      });
      console.log(this.year);
    },
    searchDeal(event) {
      event.preventDefault();
      console.log("searchDeal");
      this.getSearchDealList({
        dealYear: this.year,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
        aptCode: this.getSelectedHouse.aptCode,
      });
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
