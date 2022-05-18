<template>
  <div class="home">
    <HeaderNav />
    <HomeHeader />
    <HomeSearchBar />
    <HomeNews />
    <HomeNotice />
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
import HomeHeader from "@/components/Home/HomeHeader.vue";
import HomeSearchBar from "@/components/Home/HomeSearchBar.vue";
import HomeNews from "@/components/Home/HomeNews.vue";
import HomeNotice from "@/components/Home/HomeNotice.vue";
export default {
  name: "HomeView",
  components: {
    HeaderNav,
    HomeHeader,
    HomeNews,
    HomeNotice,
    HomeSearchBar,
  },
};
</script>
<style>
</style>