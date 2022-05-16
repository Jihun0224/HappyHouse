<template>
  <div class="home">
    <HomeHeader />
    <KakaoMap />
    <HomeNews />
    <HomeNotice />
  </div>
</template>

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import KakaoMap from "@/components/Map/KakaoMap.vue";
import HomeNews from "@/components/Home/HomeNews.vue";
import HomeNotice from "@/components/Home/HomeNotice.vue";
export default {
  name: "HomeView",
  components: {
    HomeHeader,
    HomeNews,
    HomeNotice,
    KakaoMap,
  },
};
</script>
<style>
</style>