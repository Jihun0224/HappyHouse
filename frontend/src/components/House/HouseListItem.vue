<template>
  <b-container class="li-row">
    <b-row class="mt-3">
      <b-col>
        <div class="house-name" v-on:click="changeCenter(source)">
          {{ source.aptName }}
        </div>
        <div class="house-address">
          <b-icon icon="geo-alt-fill" font-scale="1"></b-icon>
          {{ source | setAddress }}
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapMutations } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseListItem",
  props: {
    source: Object,
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_SELECTEDHOUSE",
      "SET_ISSELECTEDHOUSE",
      "SET_CENTER",
      "SET_CNTUP",
      "SET_SELECTED_CODE",
    ]),
    changeCenter(house) {
      // console.log("click" + house);
      var coords = {
        lat: house.lat,
        lng: house.lng,
      };
      this.SET_CENTER(coords);
      this.SET_CNTUP();
      this.SET_SELECTED_CODE(house.aptCode);
      //this.SET_SELECTEDHOUSE(house);
      //this.SET_ISSELECTEDHOUSE(true);
    },
  },
  filters: {
    setAddress: function (house) {
      return (
        house.sidoName +
        " " +
        house.gugunName +
        " " +
        house.dongName +
        " " +
        house.jibun
      ).replace("null null ", "");
      // 임시로 null null 이 들어가 있을 때, 공백으로 대체.
    },
  },
};
</script>

<style scoped>
.li-row {
  height: 75px;
  border-bottom: 1px solid lightgrey;
  width: 100%;
}
.house-name {
  color: #413e66;
  font-weight: 600;
  width: 100%;
}
.house-address {
  margin-top: 5px;
}
</style>
