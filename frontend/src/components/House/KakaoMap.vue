<template>
  <div id="map">
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn"><img :src="inImg" /></span>
      <span @click="zoomOut"><img :src="outImg" /></span>
    </div>
    <ul id="category">
      <li id="BK9" data-order="0">
        <span class="category_bg bank"></span>
        은행
      </li>
      <li id="MT1" data-order="1">
        <span class="category_bg mart"></span>
        마트
      </li>
      <li id="PM9" data-order="2">
        <span class="category_bg pharmacy"></span>
        약국
      </li>
      <li id="OL7" data-order="3">
        <span class="category_bg oil"></span>
        주유소
      </li>
      <li id="CE7" data-order="4">
        <span class="category_bg cafe"></span>
        카페
      </li>
      <li id="CS2" data-order="5">
        <span class="category_bg store"></span>
        편의점
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
const houseStore = "houseStore";
const memberStore = "memberStore";
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
      markers: [],
      placeOverlay: null,
      currCategory: "",
      ps: null,
      contentNode: null,
      ...mapState(memberStore, ["isLogin", "userInfo", "myHomeInfo"]),
    };
  },
  mounted() {
    this.getLocation();
    if (this.$route.name == "home") {
      var controller = document.getElementsByClassName("custom_zoomcontrol")[0];
      controller.style.top = 0;
      var category = document.getElementById("category");
      category.style.top = 0;
    }
    this.CLEAR_SELECTEDHOUSE();
  },
  methods: {
    ...mapMutations(houseStore, [
      "SET_CENTER",
      "SET_SELECTEDHOUSE",
      "SET_ISSELECTEDHOUSE",
      "CLEAR_SELECTEDHOUSE",
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
    createAroundInfo() {
      this.contentNode = document.createElement("div");
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);
      this.contentNode.className = "placeinfo_wrap";
      this.addEventHandle(
        this.contentNode,
        "mousedown",
        kakao.maps.event.preventMap
      );
      this.addEventHandle(
        this.contentNode,
        "touchstart",
        kakao.maps.event.preventMap
      );
      this.placeOverlay.setContent(this.contentNode);
      this.addCategoryClickEvent();
    },
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }
      this.placeOverlay.setMap(null);
      this.removeMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document
        .getElementById(this.currCategory)
        .getAttribute("data-order");
      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          order
        );
        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        ((marker, place) => {
          kakao.maps.event.addListener(marker, "click", () => {
            this.displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    },
    addMarker(position, order) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });
      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },
    addCategoryClickEvent() {
      var category = document.getElementById("category"),
        children = category.children;
      for (var i = 0; i < children.length; i++) {
        let id = children[i].id,
          this_ = children[i];
        children[i].addEventListener("click", () => {
          this.placeOverlay.setMap(null);
          if (this_.className === "on") {
            this.currCategory = "";
            this.changeCategoryClass();
            this.removeMarker();
          } else {
            this.currCategory = id;
            this.changeCategoryClass(this_);
            this.searchPlaces();
          }
        });
      }
    },

    changeCategoryClass(el) {
      var category = document.getElementById("category"),
        children = category.children,
        i;
      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }
      if (el) {
        el.className = "on";
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(this.getCenter.lat, this.getCenter.lng),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);

      this.createMarker();
      this.createMyMarker();
      this.ps = new kakao.maps.services.Places(this.map);
      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.createAroundInfo();
    },
    createMyMarker() {
      var activeId = null;
      var timeoutId = null;
      if (this.isLogin === false) return;
      var imageSrc =
        "https://user-images.githubusercontent.com/59672592/170097782-8afa1cd8-6040-495c-885f-41773223eec5.png";
      var myHomeMarkerImgSrc =
        "https://user-images.githubusercontent.com/59672592/170197729-7be06853-fa56-4679-9e42-508a3aa89753.png";
      var imageSize = new kakao.maps.Size(35, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var MyHomemarkerImage = new kakao.maps.MarkerImage(
        myHomeMarkerImgSrc,
        imageSize
      );

      if (this.getMyhomeinfo != null) this.getBookmark.push(this.getMyhomeinfo);
      if (this.getBookmark == null) return;
      this.getBookmark.forEach((house) => {
        var marker;
        if (
          this.getMyhomeinfo != null &&
          this.getMyhomeinfo.aptCode == house.aptCode
        ) {
          marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(house.lat, house.lng),
            title: house.aptCode,
            image: MyHomemarkerImage,
          });
        } else {
          marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(house.lat, house.lng),
            title: house.aptCode,
            image: markerImage,
          });
        }
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
                <span class="infoValue">${house.recentPrice} 만원</span>
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

        marker.setMap(this.map);
      });
    },
    createMarker() {
      var activeId = null;
      var timeoutId = null;

      var imageSrc =
        "https://user-images.githubusercontent.com/59672592/168978406-52c01767-ff40-4587-9cc5-760f8f11a164.png";
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      if (this.getHouses === null) return;

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
                <span class="infoValue">${house.recentPrice} 만원</span>
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
    ...mapGetters(houseStore, [
      "getBookmark",
      "getHouses",
      "getCenter",
      "getMyhomeinfo",
    ]),
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
#category {
  position: absolute;
  top: 100px;
  left: 10px;
  padding: 0;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
