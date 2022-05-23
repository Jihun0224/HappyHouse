<template>
  <div id="map">
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn"><img :src="inImg" /></span>
      <span @click="zoomOut"><img :src="outImg" /></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
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
      ...mapGetters(houseStore, ["houses"]),
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_CENTER",
      "SET_SELECTEDHOUSE",
      "SET_ISSELECTEDHOUSE",
    ]),
    getLocation() {
      if (!("geolocation" in navigator)) {
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          var coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          if (this.getCenter == null) this.SET_CENTER(coords);
          window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
        });
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.getCenter.lat, this.getCenter.lng),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);

      var marker = new kakao.maps.Marker({ position: this.map.getCenter() });
      marker.setMap(this.map);
      this.createMarker();
    },
    createMarker() {
      var activeId = null;
      var timeoutId = null;

      var imageSrc =
        "https://user-images.githubusercontent.com/59672592/168978406-52c01767-ff40-4587-9cc5-760f8f11a164.png";
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      if (this.getHouses === null) return;
      setTimeout(() => {}, 100);
      var markers = this.getHouses.map((house) => {
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(house.lat, house.lng),
          title: house.aptCode,
          image: markerImage,
        });
        var content = `<div class="customoverlay">
          <div class="info">
            <div class="title">${house.aptName}
              <div class="close" ></div>
            </div>
            <div class="body ml-3 my-2">
              <div class="row my-1">
                <span class="infoKey col-4">건축년도</span>
                <span class="infoValue">${house.buildYear}</span>
              </div>
              <div class="row my-1">
                <span class="infoKey col-4">주소</span>
                <span class="infoValue">${house.sidoName} ${house.gugunName} ${house.dongName} ${house.jibun}</span>
              </div>
              <div class="row my-1">
                <span class="infoKey col-4">최신거래금액</span>
                <span class="infoValue">${house.recentPrice}</span>
              </div>
            </div>
          </div>
          </div>`;
        var overlay = new kakao.maps.CustomOverlay({
          yAnchor: 2.5,
          content: content,
          position: marker.getPosition(),
        });
        var contents = document.createElement("div");
        contents.innerHTML = content;

        var mouseOverHandler = () => {
          if (timeoutId !== null && house.aptCode === activeId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
            return;
          }
          overlay.setMap(this.map);
          activeId = house.aptCode;
        };

        var mouseOutHandler = () => {
          timeoutId = window.setTimeout(function () {
            overlay.setMap(null);
            activeId = null;
            timeoutId = null;
          }, 50);
        };

        var clickHandler = () => {
          this.selectApt(house);
        };

        kakao.maps.event.addListener(marker, "mouseover", mouseOverHandler);
        kakao.maps.event.addListener(marker, "mouseout", mouseOutHandler);
        contents.addEventListener("mouseover", mouseOverHandler);
        contents.addEventListener("mouseout", mouseOutHandler);
        kakao.maps.event.addListener(marker, "click", clickHandler);
        return marker;
      });
      var clusterer = new kakao.maps.MarkerClusterer({
        map: this.map,
        averageCenter: true,
        minLevel: 4,
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
    selectApt(house) {
      // 선택된 아파트의 정보 출력을 위해 설정
      this.SET_SELECTEDHOUSE(house);
      this.SET_ISSELECTEDHOUSE(true);
    },
  },
  computed: {
    ...mapGetters(houseStore, ["getHouses", "getCenter"]),
  },
};
</script>

<style>
.customoverlay {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 120px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.customoverlay * {
  padding: 0;
  margin: 0;
}
.customoverlay .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.customoverlay .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .body .infoKey {
  color: green;
}
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
