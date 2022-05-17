<template>
  <div class="search">
    <KakaoMap />
  </div>
</template>

<script>
import KakaoMap from "@/components/Search/KakaoMap.vue";

export default {
  components: {
    KakaoMap,
  },
};
</script>
<style>
#map {
  width: 100vh;
}
</style>