<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>공지사항 보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveNoticeList"
          >목록</b-button
        >
      </b-col>
      <b-col v-if="isAdmin" class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <!-- 잘되는지 확인 -->
    <b-row v-if="notice === null">
      <b-col><b-alert show variant="light">로딩 중...</b-alert></b-col>
    </b-row>
    <b-row v-else class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${notice.articleno}.
          ${notice.subject}</h3><div><h6>${notice.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const noticeStore = "noticeStore";
const memberStore = "memberStore";

export default {
  name: "NoticeDetail",
  data() {
    return {
      isAdmin: false,
    };
  },
  computed: {
    ...mapState(noticeStore, ["notice"]),
    // 일단은 userInfo만 사용
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.notice.content)
        return this.notice.content.split("\n").join("<br>");
      return "";
    },
  },
  async created() {
    if (this.userInfo !== null && this.userInfo.userid === "admin") {
      this.isAdmin = true;
    }
    await this.getDetailNotice(this.$route.params.articleno);
  },
  methods: {
    ...mapActions(noticeStore, ["getDetailNotice"]),
    moveNoticeList() {
      this.$router.push({ name: "noticeList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "noticeModify",
        params: { articleno: this.notice.articleno },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "noticeDelete",
          params: { articleno: this.notice.articleno },
        });
      }
    },
  },
};
</script>

<style></style>
