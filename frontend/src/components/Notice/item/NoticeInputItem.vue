<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "NoticeInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        subject: "",
        content: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      this.setNotice();
    }
  },
  computed: {
    ...mapState(noticeStore, ["notice"]),
  },
  methods: {
    ...mapActions(noticeStore, [
      "registerNotice",
      "getDetailNotice",
      "modifyNotice",
    ]),
    async setNotice() {
      await this.getDetailNotice(this.$route.params.articleno);
      this.article.articleno = this.notice.articleno;
      this.article.subject = this.notice.subject;
      this.article.content = this.notice.content;
    },
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
    },
    // NoticeList에서 admin한테만 글쓰기 보임
    registArticle() {
      this.registerNotice({
        subject: this.article.subject,
        content: this.article.content,
      });
    },
    // NoticeDetail에서 admin한테만 글수정 보임
    modifyArticle() {
      this.modifyNotice({
        articleno: this.article.articleno,
        subject: this.article.subject,
        content: this.article.content,
      });
    },
    moveList() {
      this.$router.push({ name: "noticeList" });
    },
  },
};
</script>

<style></style>
