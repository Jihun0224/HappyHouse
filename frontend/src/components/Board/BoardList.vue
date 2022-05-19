<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>QnA 게시판</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-form @submit="search">
          <b-input-group>
            <b-form-select
              id="inline-form-select-key"
              class="col-4 mb-2 mr-sm-2 mb-sm-0"
              v-model="key"
              :options="options"
            ></b-form-select>
            <b-form-input
              id="word"
              class="col-6 mr-sm-2"
              v-model="word"
              type="text"
              placeholder="검색어 입력..."
            ></b-form-input>
            <b-button class="col-2" type="submit" variant="outline-primary"
              >검색</b-button
            >
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
    <!-- 여기 Vue 분리 -->
    <board-search-list
      v-if="isSearch"
      v-bind:list="searchBoardList"
    ></board-search-list>
    <board-search-list v-else v-bind:list="boardList"></board-search-list>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
//import http from "@/api/http";
import BoardSearchList from "@/components/Board/item/BoardSearchList";
import { mapState, mapActions } from "vuex";
const boardStore = "boardStore";

export default {
  name: "BoardList",
  components: {
    BoardSearchList,
  },
  data() {
    return {
      isSearch: false,
      key: null,
      options: [
        { value: null, text: "검색 대상 선택" },
        { value: "userid", text: "아이디" },
        { value: "subject", text: "제목" },
        { value: "content", text: "내용" },
      ],
      word: "",
    };
  },
  created() {
    console.log("create");
    this.getBoardList({
      key: null,
      word: null,
    });
  },
  computed: {
    ...mapState(boardStore, ["boardList", "searchBoardList"]),
  },
  methods: {
    ...mapActions(boardStore, ["getBoardList"]),
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    search(event) {
      event.preventDefault();
      console.log(this.key + " " + this.word);
      if (this.key === null) {
        alert("검색 대상을 선택해주세요.");
      } else {
        if (this.word === null || this.word === "") {
          alert("전체 검색합니다.");
        }
      }
      this.getBoardList({
        key: this.key,
        word: this.word,
      });
      this.isSearch = true;
    },
  },
};
</script>

<style scoped>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
