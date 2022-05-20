<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show variant="warning"><h3>공지사항</h3></b-alert>
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
    <!-- list 출력 -->
    <notice-search-list
      v-if="isSearch"
      v-bind:list="searchNoticeList"
    ></notice-search-list>
    <notice-search-list v-else v-bind:list="noticeList"></notice-search-list>
    <b-row class="mb-1">
      <b-col>
        <!--click 추가-->
        <b-button variant="outline-primary" v-if="isVisible" @click="moveWrite">
          글쓰기
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NoticeSearchList from "@/components/Notice/item/NoticeSearchList";
import { mapState, mapActions } from "vuex";
const noticeStore = "noticeStore";
const memberStore = "memberStore";

export default {
  name: "NoticeList",
  components: {
    NoticeSearchList,
  },
  data() {
    return {
      key: null,
      options: [
        { value: null, text: "검색 대상 선택" },
        { value: "subject", text: "제목" },
        { value: "content", text: "내용" },
      ],
      word: "",
      isVisible: false,
      isSearch: false,
    };
  },
  computed: {
    ...mapState(noticeStore, ["noticeList", "searchNoticeList"]),
    // 일단은 userInfo만 사용
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.userInfo !== null && this.userInfo.userid === "admin") {
      this.isVisible = true;
    }
    this.getNoticeList({
      key: null,
      word: null,
    });
    console.log("isVisible: " + this.isVisible);
    console.log("isSearch: " + this.isSearch);
    console.log(this.noticeList);
  },
  methods: {
    ...mapActions(noticeStore, ["getNoticeList"]),
    // 로그인 유저가 admin일 때만 보임
    moveWrite() {
      this.$router.push({ name: "noticeRegister" });
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
      this.getNoticeList({
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
