<template>
  <div class="masthead">
    <video autoplay loop muted="muted" id="bgvid">
      <source src="@/assets/video/house.mp4" type="video/mp4" />
    </video>
    <div
      class="
        container
        px-4 px-lg-5
        d-flex
        h-100
        align-items-center
        justify-content-center
      "
    >
      <div class="d-flex justify-content-center">
        <div class="text-center">
          <h1>HappyHouse</h1>
          <h2 class="text-white-50 mx-auto mt-2 mb-5">소개 자리</h2>
          <b-button variant="light" v-on:click="toSearch">Get Started</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSearch() {
      window.scrollBy({ top: window.innerHeight - 72, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.masthead {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 35rem;
  padding: 15rem 0;
  background-color: rgba(0, 0, 0, 0.15);
}
video {
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
}

.masthead h1 {
  font-family: "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 2.5rem;
  line-height: 2.5rem;
  letter-spacing: 0.8rem;
  height: 150px;
  background: linear-gradient(
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.5)
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
.masthead h2,
.masthead .h2 {
  max-width: 20rem;
  font-size: 1rem;
}

@media (min-width: 992px) {
  .masthead {
    height: 100vh;
    padding: 0;
  }
  .masthead h1,
  .masthead .h1 {
    font-size: 6.5rem;
    line-height: 6.5rem;
    letter-spacing: 0.8rem;
  }
  .masthead h2,
  .masthead .h2 {
    max-width: 30rem;
    font-size: 1.25rem;
  }
}
.btn-light {
  color: #413e66;
  border-color: #413e66;
  background-color: #f5f8fd;
  height: 50px;
}
</style>