<template>
  <div class="list">
    <b-row>
      <b-col>
        <SearchListItem
          v-for="(house, index) in getHouses"
          :key="index"
          :house="house"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SearchListItem from "@/components/Search/SearchListItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchList",
  components: {
    SearchListItem,
  },
  computed: {
    ...mapGetters(["getHouses"]),
  },
};
</script>

<style>
.list {
  padding: 0;
}
</style>