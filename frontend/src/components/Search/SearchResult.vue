<template>
  <div class="search-result">
    <div class="search-result-top">
      <p><b-icon icon="search"></b-icon>검색</p>
    </div>
    <div class="search-result-body">
      <div class="search-result-options">
        <div class="option">
          <div class="option_title">기준 년도</div>
          <div class="option_select">
            <v-select
              v-model="sidoCode"
              :options="sidos"
              @input="gugunList"
              id="select"
            />
          </div>
        </div>
        <div class="option">
          <div class="option_title">시도</div>
          <div class="option_select">
            <v-select
              v-model="sidoCode"
              :options="sidos"
              @input="gugunList"
              id="select"
            />
          </div>
        </div>
        <div class="option">
          <div class="option_title">시군구</div>
          <div class="option_select">
            <v-select
              v-model="sidoCode"
              :options="sidos"
              @input="gugunList"
              id="select"
            />
          </div>
        </div>
        <div class="option">
          <div class="option_title">읍면동</div>
          <div class="option_select">
            <v-select
              v-model="sidoCode"
              :options="sidos"
              @input="gugunList"
              id="select"
            />
          </div>
        </div>
        <div class="option_input_type">
          <div class="option_title">아파트명</div>
          <div class="option_input">
            <b-input-group>
              <b-form-input style="background-color: #f5f8fd"></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>

      <div class="search-result-body-result">
        <div class="search-result-body-result-top">
          <p><b-icon icon="list-task"></b-icon>결과</p>
          <div class="search-result-body-result">리스트</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.search-result {
  padding-top: 88px;
  background-color: #f5f8fd;

  width: 20%;
  height: 100vh;
}
.search-result-top {
  height: 50px;
  background-color: #a3a3e8;
}
.option {
  height: 35px;
  margin-top: 10px;
  margin-left: 15px;
}
.option_input_type {
  height: 55px;
  margin-top: 10px;
  margin-left: 15px;
}
.option_title {
  float: left;
  width: 100px;
  line-height: 35px;
}
.option_select {
  width: 70%;
}

.option_input {
  width: 150px;
  float: left;
}
p {
  color: #413e66;
  font-weight: 600;
  line-height: 50px;
  padding-left: 20px;
}
.search-result-options {
  background-color: #f5f8fd;
  height: 35%;
}
.search-result-body-result-top {
  height: 50px;
  background-color: #a3a3e8;
}
.search-result-body-result {
  background-color: #f5f8fd;
  height: 100%;
}
</style>