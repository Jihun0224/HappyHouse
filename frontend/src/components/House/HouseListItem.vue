<template>
  <b-container class="li-row">
    <b-row class="mt-3">
      <b-col>
        <div @click="selectApt(source)" class="house-name">
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
      );
    },
  },
  methods: {
    ...mapMutations(houseStore, ["SET_SELECTEDHOUSE", "SET_ISSELECTEDHOUSE"]),
    selectApt(house) {
      // 선택된 아파트의 정보 출력을 위해 설정
      this.SET_SELECTEDHOUSE(house);
      this.SET_ISSELECTEDHOUSE(true);
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
