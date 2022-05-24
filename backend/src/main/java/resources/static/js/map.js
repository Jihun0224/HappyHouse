$(document).ready(function(){
    var container = document.getElementById('map');
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.501314726742, 127.02730766538), 
        level: 5
    };
    const map = new kakao.maps.Map(container, options);

    var clusterer = new kakao.maps.MarkerClusterer({
        map: map, 
        averageCenter: true, 
        minLevel: 5
    });
    $.get("data/dong_coords.json", function(dong) {
        var markers = $(dong).map(function(i, data) {
            var content = '<div class="customoverlay">' +
                        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
                        '    <span class="title">'+data.dong+'</span>' +
                        '  </a>' +
                        '</div>';
            return new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(data.lat,data.lng),
                content: content,
                yAnchor: 1 
            });
        });
        clusterer.addMarkers(markers);
    });
});

