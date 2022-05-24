<template>
  <div class="wrap">
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <header class="section-header">
          <br />
          <h3>공지사항</h3>
          <br />
        </header>
        <div class="row g-5">
          <div
            v-for="(notice, i) in noticeList.slice(0, 3)"
            :key="i"
            class="col-md-6 col-lg-4 wow bounceInUp"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div class="box">
              <div class="icon" style="background: #fceef3">
                <b-icon
                  icon="info-circle-fill"
                  v-bind:style="{ color: colorList[i] }"
                ></b-icon>
              </div>
              <h4 class="title">
                <router-link
                  :to="{
                    name: 'noticeDetail',
                    params: { articleno: notice.articleno },
                  }"
                  >{{ notice.subject }}</router-link
                >
              </h4>
              <p class="description">
                {{ message(notice.content) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "HomeNotice",
  data() {
    return {
      bgcList: ["#fceef3", "#fff0da", "#e6fdfc"],
      colorList: ["#ff689b", "#e98e06", "#3fcdc7"],
    };
  },
  computed: {
    ...mapState(noticeStore, ["noticeList"]),
  },
  async created() {
    await this.getNoticeList({
      key: null,
      word: null,
    });
  },
  methods: {
    ...mapActions(noticeStore, ["getNoticeList"]),
    message(content) {
      if (content) return content.split("\n").join("<br>");
      return "";
    },
  },
};
</script>

<style scoped>
.wrap {
  background-color: #f5f8fd;
  min-height: 500px;
}
h3 {
  font-size: 36px;
  color: #413e66;
  text-align: center;
  font-weight: 700;
  position: relative;
  font-family: "Montserrat", sans-serif;
}

#services {
  padding: 60px 0 40px 0;
  position: relative;
  margin: auto;
  max-width: 1300px;
  width: calc(100% - 100px);
  height: 100%;
  min-height: 100%;
}
#services .box {
  padding: 30px;
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
  transition: all 0.3s ease-in-out;
  text-align: center;
  height: 100%;
}
#services .box:hover {
  transform: scale(1.1);
}
#services .icon {
  margin: 0 auto 15px auto;
  padding-top: 12px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
#services .icon {
  font-size: 36px;
  line-height: 0;
}
#services .title {
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 18px;
}
#services .title a {
  color: #111;
}
#services .box:hover .title a {
  color: #1bb1dc;
}
#services .description {
  font-size: 14px;
  line-height: 28px;
  margin-bottom: 0;
  text-align: left;
}
#notice-add-btn {
  float: right;
  margin-top: 20px;
}
</style>
