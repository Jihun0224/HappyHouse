<template>
  <b-modal id="log-in" title="로그인" centered hide-footer>
    <b-input-group>
      <b-input-group-prepend is-text
        ><b><b-icon icon="person-circle" scale="1"></b-icon></b
      ></b-input-group-prepend>
      <b-form-input
        id="userid"
        v-model="user.userid"
        type="text"
        placeholder="ID"
      ></b-form-input>
    </b-input-group>

    <b-input-group>
      <b-input-group-prepend is-text
        ><b><b-icon icon="lock-fill" scale="1"></b-icon></b
      ></b-input-group-prepend>
      <b-form-input
        id="userpwd"
        v-model="user.userpwd"
        type="password"
        placeholder="Password"
      ></b-form-input>
    </b-input-group>
    <div class="modal-footer">
      <b-button variant="warning" v-b-modal="'sign-up'">회원가입</b-button>
      <b-button variant="primary" type="submit" @click="confirm"
        >로그인</b-button
      >
    </div>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    methods: {
      ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
      async confirm() {
        await this.userConfirm(this.user);
        let token = sessionStorage.getItem("access-token");
        if (this.isLogin) {
          await this.getUserInfo(token);
          this.$router.push({ name: "home" });
        }
      },
      movePage() {
        this.$router.push({ name: "signup" });
      },
    },
  },
};
</script>

<style></style>
