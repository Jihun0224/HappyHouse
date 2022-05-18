<template>
  <b-container class="li-row">
    <b-row class="mt-3">
      <b-col>
        <div class="house-name">{{ house.aptName }}</div>
        <div class="house-address">
          <b-icon icon="geo-alt-fill" font-scale="1"></b-icon>
          {{ house | setAddress }}
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SearchListItem",
  props: {
    house: Object,
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
};
</script>

<style scoped>
.li-row {
  height: 90px;
  border: 1px gray solid;
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