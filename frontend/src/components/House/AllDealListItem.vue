<template>
  <b-tr>
    <b-td>{{ dealMonth }}</b-td>
    <b-td>{{ dealDay }}</b-td>
    <b-td>{{ dealAmount }}</b-td>
    <b-td>{{ area }}</b-td>
    <b-td>{{ floor }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    dealYear: Number,
    dealMonth: Number,
    dealDay: Number,
    dealAmount: String,
    area: String,
    floor: String,
  },
};
</script>

<style></style>
