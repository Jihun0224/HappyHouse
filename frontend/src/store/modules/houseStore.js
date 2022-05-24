
import { sidoList, gugunList, dongList, allHouseList, houseList, dealYearList, searchDealList,  bookmarkList, } from "@/api/house.js";

const houseStore = {
    namespaced: true,
    state: {
        selectedArea: null,
        sidos: [{ value: null, label: "시·도" }],
        guguns: [{ value: null, label: "시·군·구" }],
        dongs: [{ value: null, label: "읍·면·동" }],
        houses: null,
        allHouses: [],
        selectedHouse: null,
        isSelectedHouse: false,
        dealYears: [],
        initYear: null,
        searchDeals: [],
        isEmpty: false,
        center: null,
        centerChangeCnt: 0,
    },
    getters: {
        getSidos: state => state.sidos,
        getGuguns: state => state.guguns,
        getDongs: state => state.dongs,
        getHouses: state => state.houses,
        getBookmark: state => state.houses,
        getAllHouses: state => state.allHouses,
        getSelectedArea: state => state.selectedArea,
        getSelectedHouse: state => state.selectedHouse,
        getIsSelectedHouse: state => state.isSelectedHouse,
        getDealYears: state => state.dealYears,
        getInitYear: state => state.initYear,
        getSearchDeals: state => state.searchDeals,
        getIsEmpty: state => state.isEmpty,
        getCenter: state => state.center,
        getCenterChangeCnt: state => state.centerChangeCnt
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
                state.dongs.push({ value: dong.dongCode, label: dong.dongName, lat: dong.lat, lng: dong.lng });
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
        CLEAR_HOUSE_LIST(state) {
            state.houses = null;
        },
        SET_ALLHOUSE_LIST(state, houses) {
            state.allHouses = houses;
        },
        SET_SELECTEDAREA(state, selectedArea) {
            state.selectedArea = selectedArea
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
        SET_INITYEAR(state, year) {
            state.initYear = year;
        },
        SET_SEARCHDEAL_LIST(state, deals) {
            state.searchDeals = deals;
        },
        CLEAR_SELECTEDAREA(state) {
            state.selectedArea = null
        },
        CLEAR_SELECTEDHOUSE(state) {
            state.selectedHouse = null
        },
        SET_ISEMPTY(state, searched) {
            state.isEmpty = searched;
        },
        SET_CENTER(state, pos) {
            state.center = pos
        },
        SET_CNTUP(state) {
            state.centerChangeCnt += 1
        },

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
    SET_BOOKMARK_LIST(state, houses) {
      state.houses = houses;
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = null;
    },
    SET_ALLHOUSE_LIST(state, houses) {
      state.allHouses = houses;
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
          // console.log(commit, response);
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
          // console.log(commit, response);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouses({ commit }, searchString) {
      const params = { params: searchString };
      houseList(
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
    getBookmark({ commit }, userid) {
      const params = { params: userid };
      bookmarkList(
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
        getHouses: async function({ commit }, searchString) {
            const params = { params: searchString };
            await houseList(
                params,
                ({ data }) => {
                    if (data.length == 0) {
                        commit("SET_ISEMPTY", true);
                    }
                    else {
                        commit("SET_ISEMPTY", false);
                    }
                    commit("SET_HOUSE_LIST", data);
                },
                (error) => {
                  console.log(error);
                },
              );
            },
            getBookmark({ commit }, userid) {
                const params = { params: userid };
                bookmarkList(
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

        getAllhouses({ commit }) {
            const params = { aptName: "" }
            allHouseList(
                params,
                ({ data }) => {
                    commit("SET_ALLHOUSE_LIST", data);
                },
                (error) => {
                    console.log(error);
                },
            );
        },
        getDealYearList: async function({ commit }, aptCode) {
            const params = { aptCode: aptCode }
            await dealYearList(
                params,
                ({ data }) => {
                    commit("SET_INITYEAR", data[0]);
                    commit("SET_DEALYEAR",data);
                },
                (error) => {
                    console.log(error);
                },
            );
        },
        getSearchDealList: async function({ commit }, searchHouseDeal) {
            await searchDealList(
                searchHouseDeal,
                ({ data }) => {
                    console.log(data);
                    commit("SET_SEARCHDEAL_LIST",data);
                },
                (error) => {
                    console.log(error);
                },
            );
        }

    },
  },
};
export default houseStore;
