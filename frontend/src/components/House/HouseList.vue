<template>
  <div class="list">
    <b-row>
      <b-col>
        <HouseListItem
          v-for="(house, index) in getHouses"
          :key="index"
          :house="house"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import HouseListItem from "@/components/House/HouseListItem.vue";
import { mapGetters } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
  },
  computed: {
    ...mapGetters(houseStore, ["getHouses"]),
  },
};
</script>

<style>
.list {
  padding: 0;
}
</style>