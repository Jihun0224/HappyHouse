<template>
  <b-row class="mb-1">
    <b-col>
      <b-card :sub-title="answer.userid">
        <b-card-text>{{ answer.content }}</b-card-text>
        <b-card-text>{{ answer.regtime }}</b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import moment from "moment";

export default {
  name: "AnswerListItem",
  props: {
    answer: Object,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
