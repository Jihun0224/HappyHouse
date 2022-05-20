<template>
  <b-row>
    <b-col v-if="list.length">
      <div>답변 목록 : {{ list.length }}개</div>
      <answer-list-item
        v-for="answer in list"
        :key="answer.answerno"
        v-bind:answer="answer"
      />
    </b-col>
    <b-col v-else class="text-center">등록된 답변이 없습니다.</b-col>
  </b-row>
</template>

<script>
import AnswerListItem from "@/components/Answer/item/AnswerListItem";
export default {
  name: "AnswerList",
  components: {
    AnswerListItem,
  },
  props: ["list"],
};
</script>
