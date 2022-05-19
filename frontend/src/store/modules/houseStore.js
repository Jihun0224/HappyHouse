import { sidoList, gugunList, dongList, allHouseList, houseList } from "@/api/house.js";

const houseStore = {
    namespaced: true,
    state: {
        selectedArea: null,
        sidos: [{ value: null, label: "시·도" }],
        guguns: [{ value: null, label: "시·군·구" }],
        dongs: [{ value: null, label: "읍·면·동" }],
        houses: [],
        allHouses: [],
        selectedHouse: null
    },
    getters: {
        getSidos: state => state.sidos,
        getGuguns: state => state.guguns,
        getDongs: state => state.dongs,
        getHouses: state => state.houses,
        getAllHouses: state => state.allHouses,
        getSelectedArea: state => state.selectedArea,
        getSelectedHouse: state => state.selectedHouse
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
                state.dongs.push({ value: dong.dongCode, label: dong.dongName });
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
        SET_ALLHOUSE_LIST(state, houses) {
            state.allHouses = houses;
        },
        SET_SELECTEDAREA(state, selectedArea) {
            state.selectedArea = selectedArea
        },
        SET_SELECTEDHOUSE(state, house) {
            state.selectedHouse = house
        },
        CLEAR_SELECTEDAREA(state) {
            state.selectedArea = null
        },
        CLEAR_SELECTEDHOUSE(state) {
            state.selectedHouse = null
        },
    },
    actions: {
        getSido({ commit }) {
            sidoList(
                ({ data }) => {
                    // console.log(data);
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
        getHouses({ commit }, dong) {
            const params = { dong: dong };
            // console.log(dong);
            houseList(
                params,
                ({ data }) => {
                    // console.log(commit, response);
                    commit("SET_HOUSE_LIST", data);
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
                    // console.log(commit, response);
                    commit("SET_ALLHOUSE_LIST", data);
                },
                (error) => {
                    console.log(error);
                },
            );
        }
    },
}
export default houseStore;