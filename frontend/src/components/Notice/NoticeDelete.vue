<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항 삭제</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "NoticeDelete",
  created() {
    this.deleteNotice(this.$route.params.articleno);
  },
  methods: {
    ...mapActions(noticeStore, ["deleteNotice"]),
  },
};
</script>

<style></style>
