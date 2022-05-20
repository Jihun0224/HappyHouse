<template>
  <b-row class="mb-1">
    <b-col>
      <!-- regtime 등록 시간이 느림-->
      <b-card v-if="answer.regtime" :sub-title="answer.userid">
        <b-card-text>{{ answer.content }}</b-card-text>
        <b-card-text class="float-right">
          {{ answer.regtime }}
          <b-icon
            class="ml-2"
            v-if="isVisible"
            @click="onDelete"
            icon="x-circle"
            scale="1"
            variant="danger"
          ></b-icon>
          <b-icon v-else></b-icon>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
const answerStore = "answerStore";

export default {
  name: "AnswerListItem",
  props: {
    answer: Object,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    // 일단은 userInfo만 사용
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.userInfo !== null && this.userInfo.userid === this.answer.userid) {
      this.isVisible = true;
    }
  },
  methods: {
    ...mapActions(answerStore, ["deleteAnswer"]),
    onDelete() {
      console.log(this.answer.answerno);
      if (confirm("정말로 삭제?")) {
        this.deleteAnswer(this.answer.answerno);
        // 새로고침
        //this.$router.go();
      }
    },
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
