<template>
  <b-row>
    <b-col v-if="list.length">
      <b-table-simple hover responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>글번호</b-th>
            <b-th>제목</b-th>
            <!-- <b-th>조회수</b-th> -->
            <b-th>작성일</b-th>
          </b-tr>
        </b-thead>
        <tbody>
          <!-- 하위 component인 ListRow에 데이터 전달(props) -->
          <notice-list-item
            v-for="notice in list"
            :key="notice.articleno"
            v-bind="notice"
          />
        </tbody>
      </b-table-simple>
    </b-col>
    <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
  </b-row>
</template>

<script>
import NoticeListItem from "@/components/Notice/item/NoticeListItem";
export default {
  name: "NoticeSearchList",
  components: {
    NoticeListItem,
  },
  props: ["list"],
};
</script>
