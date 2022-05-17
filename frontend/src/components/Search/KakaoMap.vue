<template>
  <div id="map"></div>
</template>

<script>
export default {
  data() {
    return {
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
      // const API_KEY=process.env.VUE_APP_KAKAO_MAP_API_KEY
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
</style>