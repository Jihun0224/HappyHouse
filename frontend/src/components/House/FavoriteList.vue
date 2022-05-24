<template>
  <div class="Favorite-list">
    <div class="my-home-title"><b-icon icon="house"></b-icon>My House</div>
    <div class="my-home" v-if="getBookmark">
      <b-col>
        <div class="house-name" v-on:click="changeCenter(source)">
          유저 아파트명
        </div>
        <div class="house-address">
          <b-icon icon="geo-alt-fill" font-scale="1"></b-icon>
          유저 아파트 주소
        </div>
      </b-col>
    </div>
    <div class="my-home-title"><b-icon icon="star"></b-icon>관심 아파트</div>

    <virtual-list
      id="virtual-flist"
      :data-key="'aptCode'"
      :data-sources="getBookmark"
      :data-component="HouseListItem"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import HouseListItem from "@/components/House/HouseListItem.vue";
import { mapActions, mapGetters, mapState } from "vuex";
const houseStore = "houseStore";
const memberStore = "memberStore";
export default {
  name: "HouseList",
  data() {
    return {
      HouseListItem: HouseListItem,
      myHomeinfo: null,
    };
  },
  components: {
    "virtual-list": VirtualList,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(houseStore, ["getBookmark", "getMyhomeinfo"]),
  },
  methods: {
    ...mapActions(houseStore, ["getHouseInfoByaptcode"]),
    getmyhome() {
      this.getHouseInfoByaptcode(this.userInfo.myhome);
    },
  },
  created() {
    this.getmyhome();
  },
};
</script>

<style>
.my-home {
  padding-top: 10px;
  height: 75px;
  border-bottom: 1px solid lightgrey;
  width: 100%;
}
.house-name {
  color: #413e66;
  font-weight: 600;
  width: 100%;
}
.house-address {
  margin-top: 5px;
}
.Favorite-list {
  padding: 0;
  height: 80vh;
}
.my-home-title {
  background-color: #413e66;
  color: white;
  font-weight: 600;
  line-height: 50px;
  padding-left: 20px;
  margin-bottom: 0;
  height: 50px;
}
#virtual-flist {
  height: 55vh;
  overflow-y: auto;
}
@media (min-height: 970px) {
  #virtual-flist {
    height: 68vh;
    overflow-y: auto;
  }
}
</style>
