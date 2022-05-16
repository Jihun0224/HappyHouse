<template>
  <div class="container px-4 px-lg-5" id="wrap">
    <div class="select-box">
      <v-select :options="this.do" id="do" />
      <v-select :options="this.do" id="si" />
      <v-select :options="this.do" id="gu" />
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
#wrap {
  height: 100vh;
}
#wrap #map {
  position: relative;
  top: 20vh;
  height: 80vh;
}
.select-box {
}
</style>