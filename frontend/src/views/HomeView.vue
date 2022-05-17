<template>
  <div class="home">
    <HomeHeader />
    <SearchBar />
    <HomeNews />
    <HomeNotice />
  </div>
</template>

<script>
import HomeHeader from "@/components/Home/HomeHeader.vue";
import SearchBar from "@/components/Search/SearchBar.vue";
import HomeNews from "@/components/Home/HomeNews.vue";
import HomeNotice from "@/components/Home/HomeNotice.vue";
export default {
  name: "HomeView",
  components: {
    HomeHeader,
    HomeNews,
    HomeNotice,
    SearchBar,
  },
};
</script>
<style>
</style>