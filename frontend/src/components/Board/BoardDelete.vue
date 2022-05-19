<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
const boardStore = "boardStore";

export default {
  name: "BoardDelete",
  created() {
    this.deleteBoard(this.$route.params.articleno);
  },
  methods: {
    ...mapActions(boardStore, ["deleteBoard"]),
  },
};
</script>

<style></style>
