<template>
  <b-modal id="log-in" title="로그인" centered hide-footer>
    <b-input-group>
      <b-input-group-prepend is-text
        ><b><b-icon icon="person-circle" scale="1"></b-icon></b
      ></b-input-group-prepend>
      <b-form-input v-model="id" type="text" placeholder="ID"></b-form-input>
    </b-input-group>

    <b-input-group>
      <b-input-group-prepend is-text
        ><b><b-icon icon="lock-fill" scale="1"></b-icon></b
      ></b-input-group-prepend>
      <b-form-input
        v-model="password"
        type="password"
        placeholder="Password"
      ></b-form-input>
    </b-input-group>
    <div class="modal-footer">
      <b-button variant="warning" v-b-modal="'sign-up'">회원가입</b-button>
      <b-button variant="primary" type="submit" @click="login">로그인</b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      password: "",
    };
  },

  methods: {
    login() {
      const user = {
        id: this.id,
        password: this.password,
      };
      if (user.id && user.password) {
        this.$store.dispatch("login", user);
        if (this.$store.state.accessToken) {
          console.log("로그인 성공");
          this.$bvModal.hide("log-in");
        } else {
          alert("아이디와 비밀번호가 일치하지 않습니다.");
        }
      } else {
        alert("아이디와 비밀번호를 모두 입력해주세요!");
      }
    },
  },
};
</script>

<style>
</style>