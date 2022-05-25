<template>
  <div class="Favorite-list">
    <div class="my-home-title"><b-icon icon="house"></b-icon>My House</div>
    <div class="my-home" v-if="myHomeInfo">
      <b-col>
        <div class="house-name" v-on:click="changeCenter()">
          {{ getAptname() }}
        </div>
        <div class="house-address">
          <b-icon icon="geo-alt-fill" font-scale="1"></b-icon>
          {{ getAddress() }}
        </div>
      </b-col>
    </div>
    <div class="my-home-title">
      <b-icon icon="star"></b-icon>관심 아파트
      <b-icon
        @click="load"
        icon="arrow-clockwise"
        animation="spin"
        font-scale="1"
      ></b-icon>
    </div>
    <virtual-list
      id="virtual-flist"
      :data-key="'aptCode'"
      :data-sources="getBookmark"
      :data-component="HouseListItem"
      v-if="getBookmark"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import HouseListItem from "@/components/House/HouseListItem.vue";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
const houseStore = "houseStore";
const memberStore = "memberStore";
export default {
  name: "HouseList",
  data() {
    return {
      HouseListItem: HouseListItem,
    };
  },
  components: {
    "virtual-list": VirtualList,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(houseStore, ["myHomeInfo"]),
    ...mapGetters(houseStore, ["getBookmark"]),
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_SELECTEDHOUSE",
      "SET_ISSELECTEDHOUSE",
      "SET_CENTER",
      "SET_CNTUP",
    ]),
    ...mapActions(houseStore, ["getHouseInfoByaptcode", "getBookmarkList"]),
    getmyhome() {
      // console.log(this.userInfo.myhome);
      if (this.userInfo.myhome !== null && this.userInfo.myhome !== -1) {
        this.getHouseInfoByaptcode(this.userInfo.myhome);
      }
    },
    getAptname() {
      // console.log(this.myHomeInfo);
      if (this.myHomeInfo == null) return;
      return this.myHomeInfo.aptName + "";
    },
    getAddress() {
      if (this.myHomeInfo == null) return;
      return (
        this.myHomeInfo.sidoName +
        " " +
        this.myHomeInfo.gugunName +
        " " +
        this.myHomeInfo.dongName +
        " " +
        this.myHomeInfo.jibun
      );
    },
    changeCenter() {
      var coords = {
        lat: this.myHomeInfo.lat,
        lng: this.myHomeInfo.lng,
      };
      this.SET_CENTER(coords);
      this.SET_CNTUP();
      this.SET_SELECTEDHOUSE(this.myHomeInfo);
      this.SET_ISSELECTEDHOUSE(true);
    },
    load() {
      if (this.userInfo) this.getBookmarkList(this.userInfo.userid);
    },
  },
  created() {
    // console.log(this.userInfo.myhome);
    // console.log(this.myHomeInfo);
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
