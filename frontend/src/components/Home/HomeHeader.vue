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
          <div class="word">
            <span>H</span>&nbsp; <span>A</span>&nbsp; <span>PP</span>&nbsp;
            <span>Y </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>HOUSE</span>
          </div>
          <h2 class="text-white-50 mx-auto mt-2 mb-5"></h2>
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
      window.scrollBy({ top: window.innerHeight - 45, behavior: "smooth" });
    },
  },
  mounted() {
    const spans = document.querySelectorAll(".word span");

    spans.forEach((span, idx) => {
      span.addEventListener("click", (e) => {
        e.target.classList.add("active");
      });
      span.addEventListener("animationend", (e) => {
        e.target.classList.remove("active");
      });

      setTimeout(() => {
        span.classList.add("active");
      }, 750 * (idx + 1));
    });
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
@import url("https://fonts.googleapis.com/css?family=Anton|Roboto");

.word {
  font-family: "Anton", sans-serif;
  perspective: 1000px;
  color: rgba(255, 255, 255, 0.7);
}

.word span {
  cursor: pointer;
  display: inline-block;
  font-size: 100px;
  user-select: none;
  line-height: 0.8;
}

.word span:nth-child(1).active {
  animation: balance 1.5s ease-out;
  transform-origin: bottom left;
}

@keyframes balance {
  0%,
  100% {
    transform: rotate(0deg);
  }

  30%,
  60% {
    transform: rotate(-45deg);
  }
}

.word span:nth-child(2).active {
  animation: shrinkjump 1s ease-in-out;
  transform-origin: bottom center;
}

@keyframes shrinkjump {
  10%,
  35% {
    transform: scale(2, 0.2) translate(0, 0);
  }

  45%,
  50% {
    transform: scale(1) translate(0, -150px);
  }

  80% {
    transform: scale(1) translate(0, 0);
  }
}

.word span:nth-child(3).active {
  animation: falling 2s ease-out;
  transform-origin: bottom center;
}

@keyframes falling {
  12% {
    transform: rotateX(240deg);
  }

  24% {
    transform: rotateX(150deg);
  }

  36% {
    transform: rotateX(200deg);
  }

  48% {
    transform: rotateX(175deg);
  }

  60%,
  85% {
    transform: rotateX(180deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}

.word span:nth-child(4).active {
  animation: rotate 1s ease-out;
}

@keyframes rotate {
  20%,
  80% {
    transform: rotateY(180deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

.word span:nth-child(5).active {
  animation: toplong 1.5s linear;
}

@keyframes toplong {
  10%,
  40% {
    transform: translateY(-48vh) scaleY(1);
  }

  90% {
    transform: translateY(-48vh) scaleY(4);
  }
}
</style>