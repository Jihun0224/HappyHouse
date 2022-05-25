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
      <b-tab title="최신거래" @click="recentDealMode">
        <div class="row my-1">
          <span class="infoKey col-4">아파트명</span>
          <span class="infoValue">{{ getSelectedHouse.aptName }}</span>
          <b-icon
            class="ml-2"
            v-if="userInfo && userInfo.myhome === getSelectedHouse.aptCode"
            icon="house-fill"
            scale="1"
            variant="success"
          ></b-icon>
          <b-icon
            class="ml-2"
            v-if="userInfo && getIsRegisteredBM"
            icon="star-fill"
            scale="1"
            variant="warning"
          ></b-icon>
        </div>
        <div class="row my-1">
          <span class="infoKey col-4">건축년도</span>
          <span class="infoValue">{{ getSelectedHouse.buildYear }}</span>
        </div>
        <div class="row my-1">
          <span class="infoKey col-4">주소</span>
          <span class="infoValue">{{
            (
              getSelectedHouse.sidoName +
              " " +
              getSelectedHouse.gugunName +
              " " +
              getSelectedHouse.dongName +
              " " +
              getSelectedHouse.jibun
            ).replace("null null ", "")
          }}</span>
        </div>
        <div class="row my-1">
          <span class="infoKey col-4">최신거래금액</span>
          <span class="infoValue">{{ getSelectedHouse.recentPrice }}</span>
        </div>
        <!-- 로그인 했을 때만 보이게-->
        <div v-if="userInfo">
          <!-- 등록된 마이홈이 아닐 때만 보이게 -->
          <b-button
            v-if="userInfo.myhome !== getSelectedHouse.aptCode"
            type="submit"
            @click="setmyhome(true)"
            id="my-btn"
            >마이홈 등록</b-button
          >
          <b-button v-else type="submit" @click="setmyhome(false)" id="my-btn"
            >마이홈 삭제</b-button
          >
          <!-- 즐겨찾기에 있을 때랑 없을 때 파악 후 보이게 -->
          <b-button
            v-if="!getIsRegisteredBM"
            type="submit"
            @click="addBookmark"
            id="my-btn"
            >즐겨찾기 등록</b-button
          >
          <b-button v-else type="submit" @click="deleteBookmark"
            >즐겨찾기 삭제</b-button
          >
        </div>
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
        <HouseDetailChart
          v-bind:aptName="getSelectedHouse.aptName"
          v-bind:avgList="avgList"
          :key="searched"
        />
        <all-deal-list v-bind:list="getSearchDeals"></all-deal-list>
      </b-tab>
      <b-tab title="1km이내 주변 정보">
        <HouseDetailBarChart
          v-bind:aptName="getSelectedHouse.aptName"
          v-bind:aroundCntArray="this.aroundCnt"
        />
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import axios from "axios";
import HouseDetailBarChart from "@/components/House/HouseDetailBarChart.vue";
import HouseDetailChart from "@/components/House/HouseDetailChart.vue";
import AllDealList from "@/components/House/AllDealList.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
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
      aroundCnt: [...Array(9)].map(() => 0),
    };
  },
  components: {
    AllDealList,
    HouseDetailChart,
    HouseDetailBarChart,
  },

  computed: {
    ...mapState(houseStore, ["searched", "avgList"]),
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(houseStore, [
      "getIsSelectedHouse",
      "getSelectedHouse",
      "getDealYears",
      "getSearchYear",
      "getSearchDeals",
      "getIsRegisteredBM",
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
  mounted() {
    this.getAroundInfo();
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_SELECTEDHOUSE",
      "SET_ISSELECTEDHOUSE",
      "SET_DEALYEAR",
      "SET_SEARCHYEAR",
      "SET_SEARCHDEAL_LIST",
      "SET_SEARCHED",
      "SET_MYHOMEINFO",
    ]),
    ...mapActions(houseStore, [
      "getAvgList",
      "getDealYearList",
      "getSearchDealList",
      "getIsRegisteredBookmark",
      "addbookmark",
      "deletebookmark",
    ]),
    ...mapActions(memberStore, ["setMyhome"]),
    async setData() {
      var SearchParams = {
        aptCode: this.getSelectedHouse.aptCode,
        dealYear: this.year,
        min: this.area.minArea,
        max: this.area.maxArea,
      };
      await this.getAvgList(SearchParams);
      this.SET_SEARCHED();
    },
    setmyhome(reg) {
      if (reg) {
        // 등록
        this.user.myhome = this.getSelectedHouse.aptCode;
        this.setMyhome(this.user);
      } else {
        // 삭제
        // null이 backend에서 0으로 들어감
        this.user.myhome = -1;
        this.setMyhome(this.user);
        // myhomeinfo => null
        this.SET_MYHOMEINFO(null);
      }
    },
    addBookmark() {
      this.bookmark.userid = this.user.userid;
      this.bookmark.aptCode = this.getSelectedHouse.aptCode;
      // console.log(this.bookmark);
      this.addbookmark(this.bookmark);
      alert("등록되었습니다.");
    },
    deleteBookmark() {
      this.bookmark.userid = this.user.userid;
      this.bookmark.aptCode = this.getSelectedHouse.aptCode;
      this.deletebookmark(this.bookmark);
      alert("삭제되었습니다.");
    },
    closeModal() {
      this.SET_SELECTEDHOUSE(null);
      this.SET_ISSELECTEDHOUSE(false);
      this.SET_DEALYEAR(null);
      this.SET_SEARCHYEAR(null);
      this.SET_SEARCHDEAL_LIST(null);
    },
    async recentDealMode() {
      console.log("recent deal mode");
      if (this.userInfo !== null) {
        // 로그인 되어있을 때
        // 해당 아파트 북마크 존재하는지 확인
        await this.getIsRegisteredBookmark({
          userid: this.userInfo.userid,
          aptCode: this.getSelectedHouse.aptCode,
        });
      }
      console.log(this.getIsRegisteredBM);
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
      this.setData();
      // console.log(this.year);
    },
    searchDeal(event) {
      event.preventDefault();
      // console.log("searchDeal");
      // console.log(this.area);
      this.getSearchDealList({
        dealYear: this.year,
        minArea: this.area.minArea,
        maxArea: this.area.maxArea,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
        aptCode: this.getSelectedHouse.aptCode,
      });
      this.setData();
    },
    getAroundInfo() {
      const REST_API_KEY = "45c15e1b5ec6fa1a4d3937e3546de43e";
      var category_group_codes = [
        "MT1",
        "CS2",
        "PS3",
        "SC4",
        "OL4",
        "SW8",
        "CT1",
        "PM9",
        "HP8",
      ];
      category_group_codes.forEach((code, i) => {
        let params = {
          category_group_code: code,
          y: this.getSelectedHouse.lat,
          x: this.getSelectedHouse.lng,
          radius: 1000,
        };
        axios
          .get("https://dapi.kakao.com/v2/local/search/category.json", {
            headers: {
              Authorization: `KakaoAK ${REST_API_KEY}`,
            },
            params: params,
          })
          .then((result) => {
            this.aroundCnt[i] = result.data.meta.total_count;
          });
      });
    },
  },
  created() {
    console.log("created");
    this.user = this.userInfo;
    this.recentDealMode();
  },
};
</script>

<style>
#my-btn {
  margin-right: 10px;
}
</style>
