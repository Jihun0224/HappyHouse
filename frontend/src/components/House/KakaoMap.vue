<template>
  <div id="map">
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn"><img :src="inImg" /></span>
      <span @click="zoomOut"><img :src="outImg" /></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
const houseStore = "houseStore";

export default {
  data() {
    return {
      latitude: 37.501314726742,
      longitude: 127.02730766538,
      map: null,
      inImg:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png",
      outImg:
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png",
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    ...mapMutations(houseStore, ["SET_CENTER", "SET_SELECTEDHOUSE"]),
    ...mapActions(houseStore, ["getAllhouses"]),
    getLocation() {
      if (!("geolocation" in navigator)) {
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          var coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          this.SET_CENTER(coords);
          window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
        });
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.getCenter.lat, this.getCenter.lon),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      var marker = new kakao.maps.Marker({ position: this.map.getCenter() });
      marker.setMap(this.map);
      this.createMarker();
    },
    createMarker() {
      if (this.getAllhouses.length == 0) this.getAllhouses();

      var imageSrc =
        "https://user-images.githubusercontent.com/59672592/168978406-52c01767-ff40-4587-9cc5-760f8f11a164.png";
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      var markers = this.getAllHouses.map(function (house) {
        return new kakao.maps.Marker({
          position: new kakao.maps.LatLng(house.lat, house.lng),
          title: house.aptName,
          image: markerImage,
        });
      });

      var clusterer = new kakao.maps.MarkerClusterer({
        map: this.map,
        averageCenter: true,
        minLevel: 5,
      });
      clusterer.addMarkers(markers);
      markers.map((marker) => {
        kakao.maps.event.addListener(marker, "click", () => {
          var moveLatLon = new kakao.maps.LatLng(
            marker.getPosition().Ma,
            marker.getPosition().La
          );
          this.map.panTo(moveLatLon);
        });
      });
    },
    addScript() {
      // const API_KEY=process.env.VUE_APP_KAKAO_MAP_API_KEY
      const API_KEY = "5c1c5e499996ae9f12b29dfc9a75f172";
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        API_KEY +
        "&libraries=services,clusterer";
      document.head.appendChild(script);
    },
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1);
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1);
    },
  },
  computed: {
    ...mapGetters(houseStore, ["getAllHouses", "getCenter"]),
  },
};
</script>


<style scoped>
.custom_zoomcontrol {
  position: absolute;
  top: 100px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 2;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 39px;
  padding: 12px 0;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}
.radius_border {
  border: 1px solid #919191;
  border-radius: 5px;
}
</style>