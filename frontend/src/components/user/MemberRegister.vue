<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <br /><br /><br /><br />
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>

    <b-col></b-col>
    <b-col
      class="center-block"
      id="form-card"
      style="width: 50%; float: none; margin: 0 auto"
    >
      <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
        <b-form class="text-left" @submit="register">
          <b-form-group label="아이디:" label-for="userid">
            <b-form-input
              id="userid"
              v-model="user.userid"
              required
              placeholder="아이디 입력...."
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호:" label-for="userpwd">
            <b-form-input
              type="password"
              id="userpwd"
              v-model="user.userpwd"
              required
              placeholder="비밀번호 입력...."
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호 확인:" label-for="userpwdConfirm">
            <b-form-input
              type="password"
              id="userpwdConfirm"
              v-model="userpwdConfirm"
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
          <b-button type="submit" variant="primary" class="m-1"
            >회원가입</b-button
          >
        </b-form>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
//import memberStore from "@/store/modules/memberStore";
import { mapActions, mapMutations, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberRegister",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
        email: null,
        phone: null,
        username: null,
      },
      userpwdConfirm: null,
      pwMatches: true,
    };
  },
  created() {
    //this.SET_IS_SIGNUP_ERROR(false);
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "isSignupError"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_SIGNUP_ERROR"]),
    ...mapActions(memberStore, ["registerMember"]),

    pwCheck() {
      if (this.user.userpwd == this.userpwdConfirm) {
        this.pwMatches = true;
      } else {
        this.pwMatches = false;
      }
    },
    async register(event) {
      // console.log("회원가입 버튼 눌렸음");
      event.preventDefault();
      this.pwCheck();
      if (this.pwMatches) {
        await this.registerMember(this.user);
        if (this.isSignupError === false) {
          alert("가입을 환영합니다!");
          this.movePage();
        } else {
          alert("이미 가입된 아이디입니다.");
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
    movePage() {
      // 로그인으로 가게 수정
      this.$router.push({ name: "signIn" });
    },
  },
};
</script>

<style>
.form-card {
  display: flex;
  align-items: center;
}
</style>
