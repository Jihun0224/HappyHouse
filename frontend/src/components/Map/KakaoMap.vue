<template>
  <div id="search">
    <div class="container px-4 px-lg-5">
      <div class="title"><h1>Search</h1></div>
      <div class="select-box-wrap">
        <div class="select-box">
          <div style="background: #fff">
            <v-select
              v-model="searchParams.sido"
              :options="this.do"
              id="select"
            />
          </div>
          <div style="background: #fff">
            <v-select
              v-model="searchParams.si"
              :options="this.do"
              id="select"
            />
          </div>
          <div style="background: #fff">
            <v-select
              v-model="searchParams.gu"
              :options="this.do"
              id="select"
            />
          </div>
          <b-button id="search-button">검색</b-button>
        </div>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParams: {
        sido: "시·도를 선택해주세요.",
        si: "시·군·구를 선택해주세요.",
        gu: "읍·면·동을 선택해주세요.",
      },
      do: ["서울특별시", "경기도"],
      latitude: 37.501314726742,
      longitude: 127.02730766538,
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (!("geolocation" in navigator)) {
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude;
          window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
        });
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 5,
      };
      var map = new kakao.maps.Map(container, options);
      var marker = new kakao.maps.Marker({ position: map.getCenter() });
      marker.setMap(map);
    },
    addScript() {
      const API_KEY = "5c1c5e499996ae9f12b29dfc9a75f172";
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + API_KEY;
      document.head.appendChild(script);
    },
  },
};
</script>


<style scoped>
#search {
  height: 95vh;
  background-color: #f5f8fd;
}
#search #map {
  height: 60vh;
}
.select-box {
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-around;
}
#select {
  width: 270px;
  height: 30px;
}
#search-button {
  height: 37px;
  background-color: #413e66;
}
h1 {
  text-align: center;
  color: #413e66;
  font-size: 6vh;
  padding-top: 6vh;
}
</style>