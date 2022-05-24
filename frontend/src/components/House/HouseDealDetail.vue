<template>
  <b-modal
    v-model="isSelectedHouse"
    v-if="getSelectedHouse"
    size="xl"
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
        <b-button type="submit" @click="addBookmark">즐겨찾기 등록</b-button>
        <b-button type="submit" @click="deleteBookmark">즐겨찾기 삭제</b-button>
      </b-tab>
      <b-tab title="모든 거래" @click="allDealsMode">
        <div class="row my-1">
          <h5 class="col-12 text-center">{{ getSelectedHouse.aptName }}</h5>
        </div>
        <b-form class="mb-2" @submit="searchDeal" inline>
          <label class="ml-1" for="inline-form-year">년도 :</label>
          <b-form-select
            id="inline-form-year"
            class="col-1 ml-1 mb-2 mr-sm-2 mb-sm-0"
            v-model="year"
            :options="getDealYears"
            required
          ></b-form-select>
          <label class="ml-1" for="inline-form-area">면적 :</label>
          <b-form-select
            id="inline-form-area"
            class="col-2 ml-1 mb-2 mr-sm-2 mb-sm-0"
            v-model="area"
            :options="areaOpt"
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
      area: { minArea: null, maxArea: null },
      // 0~18, 18~24. 24~32. 32~45, 45~60, 60~
      // 한평당 3.3으로 계산
      areaOpt: [
        { value: { minArea: null, maxArea: null }, text: "전체" },
        { value: { minArea: 0, maxArea: 3.3 * 18 }, text: "18평 이하" },
        {
          value: { minArea: 3.3 * 18, maxArea: 3.3 * 24 },
          text: "18평 ~ 24평",
        },
        {
          value: { minArea: 3.3 * 24, maxArea: 3.3 * 32 },
          text: "24평 ~ 32평",
        },
        {
          value: { minArea: 3.3 * 32, maxArea: 3.3 * 45 },
          text: "32평 ~ 45평",
        },
        {
          value: { minArea: 3.3 * 45, maxArea: 3.3 * 60 },
          text: "45평 ~ 60평",
        },
        { value: { minArea: 3.3 * 60, maxArea: 1000 }, text: "60평 이상" },
      ],
      minAmount: 10000,
      maxAmount: 100000,
      bookmark: {
        userid: null,
        aptCode: null,
      },
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
      "getSearchYear",
      "getSearchDeals",
    ]),
    year: {
      get() {
        return this.getSearchYear;
      },
      set(year) {
        return this.SET_SEARCHYEAR(year);
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
      "SET_SEARCHYEAR",
      "SET_SEARCHDEAL_LIST",
    ]),
    ...mapActions(houseStore, [
      "getDealYearList",
      "getSearchDealList",
      "addbookmark",
      "deletebookmark",
    ]),
    ...mapActions(memberStore, ["setMyhome"]),
    setmyhome() {
      this.user.myhome = this.selectedHouse.aptCode;
      this.setMyhome(this.user);
      console.log(this.user.myhome);
    },
    addBookmark() {
      this.bookmark.userid = this.user.userid;
      this.bookmark.aptCode = this.selectedHouse.aptCode;
      console.log(this.bookmark);
      this.addbookmark(this.bookmark);
    },
    deleteBookmark() {
      this.bookmark.userid = this.user.userid;
      this.bookmark.aptCode = this.selectedHouse.aptCode;
      this.deletebookmark(this.bookmark);
    },
    closeModal() {
      this.SET_SELECTEDHOUSE(null);
      this.SET_ISSELECTEDHOUSE(false);
      this.SET_DEALYEAR(null);
      this.SET_SEARCHYEAR(null);
      this.SET_SEARCHDEAL_LIST(null);
    },
    async allDealsMode() {
      console.log("all deals mode");
      await this.getDealYearList(this.getSelectedHouse.aptCode);
      this.getSearchDealList({
        dealYear: this.year,
        minArea: this.area.minArea,
        maxArea: this.area.maxArea,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
        aptCode: this.getSelectedHouse.aptCode,
      });
      console.log(this.year + " " + this.area);
    },
    searchDeal(event) {
      event.preventDefault();
      console.log("searchDeal");
      console.log(this.area);
      this.getSearchDealList({
        dealYear: this.year,
        minArea: this.area.minArea,
        maxArea: this.area.maxArea,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
        aptCode: this.getSelectedHouse.aptCode,
      });
    },
  },
  created() {
    this.user = this.userInfo;
  },
};
</script>

<style></style>
