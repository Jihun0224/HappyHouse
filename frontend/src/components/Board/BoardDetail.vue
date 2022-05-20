<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveBoardList"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right">
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
    <b-row v-if="board === null">
      <b-col><b-alert show variant="light">로딩 중...</b-alert></b-col>
    </b-row>
    <b-row v-else class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${board.articleno}.
          ${board.subject}</h3><div><h6>${board.userid}</div><div>${board.regtime}</h6></div>`"
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
    <answer-list v-bind:list="answerList"></answer-list>
    <b-form @submit="onSubmit">
      <div>답변 쓰기</div>
      <b-form-textarea
        rows="3"
        max-rows="6"
        v-model="answer.content"
        required
        placeholder="답변 입력..."
      ></b-form-textarea>
      <b-button class="mt-2 float-right" type="submit" variant="success"
        >등록</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
import AnswerList from "@/components/Answer/AnswerList";
import { mapState, mapActions } from "vuex";
const boardStore = "boardStore";
const answerStore = "answerStore";
const memberStore = "memberStore";

export default {
  components: { AnswerList },
  name: "BoardDetail",
  data() {
    return {
      answer: {
        articleno: this.$route.params.articleno,
        userid: "",
        content: "",
        regtime: "",
      },
    };
  },
  computed: {
    ...mapState(boardStore, ["board"]),
    ...mapState(answerStore, ["answerList"]),
    // 일단은 userInfo만 사용
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.board.content)
        return this.board.content.split("\n").join("<br>");
      return "";
    },
  },
  async created() {
    await this.getDetailBoard(this.$route.params.articleno);
    await this.getAnswerList(this.$route.params.articleno);
  },
  methods: {
    ...mapActions(boardStore, ["getDetailBoard"]),
    ...mapActions(answerStore, ["registerAnswer", "getAnswerList"]),
    moveBoardList() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      if (
        this.userInfo === null ||
        this.userInfo.userid !== this.board.userid
      ) {
        alert("수정 권한이 없습니다.");
      } else {
        this.$router.replace({
          name: "boardModify",
          params: { articleno: this.board.articleno },
        });
      }
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (
        this.userInfo === null ||
        this.userInfo.userid !== this.board.userid
      ) {
        alert("삭제 권한이 없습니다.");
      } else {
        if (confirm("정말로 삭제?")) {
          this.$router.replace({
            name: "boardDelete",
            params: { articleno: this.board.articleno },
          });
        }
      }
    },
    async onSubmit(event) {
      event.preventDefault();
      if (this.userInfo === null) {
        alert("회윈만 답변을 쓸 수 있습니다. 로그인해주세요!");
      } else {
        this.answer.userid = this.userInfo.userid;
        await this.registerAnswer(this.answer);
        console.log(this.answerList);
        // 새로고침 -> 아니면 다시 getAnswerList
        //await this.getAnswerList(this.$route.params.articleno);
        this.$router.go();
      }
    },
  },
};
</script>

<style></style>
