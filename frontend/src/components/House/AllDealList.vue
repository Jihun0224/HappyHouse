<template>
  <b-row>
    <b-col>
      <b-table-simple hover responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>월</b-th>
            <b-th>일</b-th>
            <b-th>거래금액</b-th>
            <b-th>면적</b-th>
            <b-th>층</b-th>
          </b-tr>
        </b-thead>
        <tbody>
          <all-deal-list-item
            v-for="deal in list"
            :key="deal.no"
            v-bind="deal"
          />
        </tbody>
      </b-table-simple>
    </b-col>
  </b-row>
</template>

<script>
import AllDealListItem from "@/components/House/AllDealListItem.vue";
export default {
  name: "AllDealList",
  components: {
    AllDealListItem,
  },
  props: ["list"],
  created() {
    console.log("allDealList components");
  },
};
</script>
