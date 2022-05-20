<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <br /><br /><br /><br />
        <b-alert variant="secondary" show><h3>회원정보 수정</h3></b-alert>
      </b-col>
    </b-row>

    <b-col></b-col>
    <b-col cols="8">
      <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
        <b-form class="text-left">
          <!-- <b-alert show variant="danger" v-if="isLoginError"
            >아이디 또는 비밀번호를 확인하세요.</b-alert
          > -->

          <b-form-group label="비밀번호:" label-for="userpwd">
            <b-form-input
              type="password"
              id="userpwd"
              v-model="user.userpwd"
              required
              placeholder="비밀번호 입력...."
            ></b-form-input>
          </b-form-group>

          <b-form-group label="이름:" label-for="username">
            <b-form-input
              type="text"
              id="username"
              v-model="user.username"
              required
              placeholder="이름"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="전화번호:" label-for="userphone">
            <b-form-input
              type="text"
              id="userphone"
              v-model="user.phone"
              required
              placeholder="전화번호 입력...."
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email:" label-for="email">
            <b-form-input
              type="email"
              id="useremail"
              v-model="user.email"
              required
              placeholder="이메일 입력...."
            ></b-form-input>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            class="m-1"
            @click="updateMember"
            >수정하기</b-button
          >
        </b-form>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
//import memberStore from "@/store/modules/memberStore";
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberUpdate",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.user = this.userInfo;
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["modifyMember"]),

    updateMember() {
      this.modifyMember(this.user);
      this.mvMyPage();
    },
    mvMyPage() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
