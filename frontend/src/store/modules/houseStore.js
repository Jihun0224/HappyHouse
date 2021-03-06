import {
  sidoList,
  gugunList,
  dongList,
  houseList,
  dealYearList,
  searchDealList,
  bookmarkList,
  dealAVG,
  existBookmark,
  registerBookmark,
  removeBookmark,
  getHouseInfoByAptCode,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    selectedArea: null,
    sidos: [{ value: null, label: "시·도" }],
    guguns: [{ value: null, label: "시·군·구" }],
    dongs: [{ value: null, label: "읍·면·동" }],
    houses: null,
    bookmarks: null,
    selectedHouse: null,
    isSelectedHouse: false,
    dealYears: [],
    searchYear: null,
    searchDeals: [],
    isEmpty: false,
    center: null,
    centerChangeCnt: 0,
    avgList: null,
    searched: 0,
    myHomeInfo: null,
    isRegisteredBookmark: false,
    myHomeAvgList: null,
    selectedCode: null
  },
  getters: {
    getSidos: (state) => state.sidos,
    getGuguns: (state) => state.guguns,
    getDongs: (state) => state.dongs,
    getHouses: (state) => state.houses,
    getSelectedArea: (state) => state.selectedArea,
    getSelectedHouse: (state) => state.selectedHouse,
    getIsSelectedHouse: (state) => state.isSelectedHouse,
    getDealYears: (state) => state.dealYears,
    getSearchYear: (state) => state.searchYear,
    getSearchDeals: (state) => state.searchDeals,
    getIsEmpty: (state) => state.isEmpty,
    getCenter: (state) => state.center,
    getCenterChangeCnt: (state) => state.centerChangeCnt,
    getBookmark: (state) => state.bookmarks,
    getAvg: (state) => state.avgList,
    getMyhomeinfo: (state) => state.myHomeInfo,
    getIsRegisteredBM: (state) => state.isRegisteredBookmark,
    getMyHomeAvgList: (state) => state.myHomeAvgList,
    getSelectedCode: (state) => state.selectedCode
  },
  mutations: {
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, label: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, label: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({
          value: dong.dongCode,
          label: dong.dongName,
          lat: dong.lat,
          lng: dong.lng,
        });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, label: "시·도" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, label: "시·군·구" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, label: "읍·면·동" }];
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_BOOKMARK_LIST(state, bookmarks) {
      state.bookmarks = bookmarks;
    },
    CLEAR_BOOKMARK_LIST(state) {
      state.bookmarks = null;
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = null;
    },
    SET_SELECTEDAREA(state, selectedArea) {
      state.selectedArea = selectedArea;
    },
    SET_SELECTEDHOUSE(state, house) {
      state.selectedHouse = house;
    },
    SET_ISSELECTEDHOUSE(state, bool) {
      state.isSelectedHouse = bool;
    },
    SET_DEALYEAR(state, years) {
      state.dealYears = years;
    },
    SET_SEARCHYEAR(state, year) {
      state.searchYear = year;
    },
    SET_SEARCHDEAL_LIST(state, deals) {
      state.searchDeals = deals;
    },
    CLEAR_SELECTEDAREA(state) {
      state.selectedArea = null;
    },
    CLEAR_SELECTEDHOUSE(state) {
      state.selectedHouse = null;
    },
    SET_ISEMPTY(state, searched) {
      state.isEmpty = searched;
    },
    SET_CENTER(state, pos) {
      state.center = pos;
    },
    SET_CNTUP(state) {
      state.centerChangeCnt += 1;
    },
    SET_AVGLIST_LIST(state, data) {
      var tmp = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"];
      data.map((d) => {
        tmp[d.month - 1] = d.avg;
      });
      state.avgList = tmp;
    },
    SET_MYHOMEAVG_List(state, data) {
      var tmp = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"];
      data.map((d) => {
        tmp[d.month - 1] = d.avg;
      });
      state.myHomeAvgList = tmp;
    },
    CLEAR_MYHOMEAVG_List(state) {
      state.myHomeAvgList = [
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
        "x",
      ];
    },
    SET_SEARCHED(state) {
      state.searched += 1;
    },
    SET_BOOKMARK(state, bookmark) {
      state.bookmark = bookmark;
    },
    SET_MYHOMEINFO(state, myHomeInfo) {
      state.myHomeInfo = myHomeInfo;
    },
    SET_ISREGISTEREDBOOKMARK(state, isRegisteredBookmark) {
      state.isRegisteredBookmark = isRegisteredBookmark;
    },
    CLEAR_MYHOMEINFO(state) {
      state.myHomeInfo = null;
    },
    SET_SELECTED_CODE(state, selectedCode) {
      state.selectedCode = selectedCode
    }
  },
  actions: {
    getSido({ commit }) {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getDong({ commit }, gugunCode) {
      const params = { gugun: gugunCode };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouses: async function ({ commit }, searchString) {
      const params = { params: searchString };
      await houseList(
        params,
        ({ data }) => {
          if (data.length == 0) {
            commit("SET_ISEMPTY", true);
          } else {
            commit("SET_ISEMPTY", false);
          }
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },

    getDealYearList: async function ({ commit }, aptCode) {
      const params = { aptCode: aptCode };
      await dealYearList(
        params,
        ({ data }) => {
          commit("SET_SEARCHYEAR", data[0]);
          commit("SET_DEALYEAR", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getSearchDealList: async function ({ commit }, searchHouseDeal) {
      await searchDealList(
        searchHouseDeal,
        ({ data }) => {
          commit("SET_SEARCHDEAL_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getBookmarkList: async function ({ commit }, userid) {
      const params = { userid: userid };
      await bookmarkList(
        params,
        ({ data }) => {
          if (data.length == 0) {
            commit("SET_ISEMPTY", true);
          } else {
            commit("SET_ISEMPTY", false);
          }
          commit("SET_BOOKMARK_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getIsRegisteredBookmark: async function ({ commit }, searchBookmark) {
      await existBookmark(
        searchBookmark,
        ({ data }) => {
          // console.log(data);
          commit("SET_ISREGISTEREDBOOKMARK", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    addbookmark: async function ({ commit }, bookmark) {
      await registerBookmark(bookmark);
      commit("SET_BOOKMARK", bookmark);
      commit("SET_ISREGISTEREDBOOKMARK", true);
    },
    deletebookmark: async function ({ commit }, bookmark) {
      await removeBookmark(bookmark);
      commit("SET_BOOKMARK", bookmark);
      commit("SET_ISREGISTEREDBOOKMARK", false);
    },
    getAvgList: async function ({ commit }, SearchParams) {
      await dealAVG(
        SearchParams,
        ({ data }) => {
          commit("SET_AVGLIST_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getMyAvgList: async function ({ commit }, SearchParams) {
      await dealAVG(
        SearchParams,
        ({ data }) => {
          commit("SET_MYHOMEAVG_List", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouseInfoByaptcode({ commit }, aptCode) {
      const params = { aptCode: aptCode };
      getHouseInfoByAptCode(params, ({ data }) => {
        commit("SET_MYHOMEINFO", data);
      });
    },
  },
};
export default houseStore;
