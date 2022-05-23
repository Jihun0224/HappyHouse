<template>
  <div class="list" v-if="getHouses">
    <virtual-list
      id="virtual-list"
      :data-key="'aptCode'"
      :data-sources="getHouses"
      :data-component="HouseListItem"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import HouseListItem from "@/components/House/HouseListItem.vue";
import { mapGetters } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseList",
  data() {
    return {
      HouseListItem: HouseListItem,
    };
  },
  components: {
    "virtual-list": VirtualList,
  },
  computed: {
    ...mapGetters(houseStore, ["getHouses"]),
  },
};
</script>

<style>
.list {
  padding: 0;
  height: 55vh;
}
#virtual-list {
  height: 40vh;
  overflow-y: auto;
}
@media (min-height: 970px) {
  #virtual-list {
    height: 55vh;
    overflow-y: auto;
  }
}
</style>