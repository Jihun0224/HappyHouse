<template>
  <b-modal id="log-in" title="로그인" centered hide-footer>
    <b-form-input v-model="id" type="text" placeholder="ID"></b-form-input>
    <b-form-input
      v-model="password"
      type="password"
      placeholder="Password"
    ></b-form-input>
    <div class="modal-footer">
      <button type="submit" class="btn btn-warning" onclick="signUp()">
        로그인
      </button>
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
      let user = {
        id: this.id,
        password: this.password,
      };

      this.$emit("login", user);
    },
  },
};
</script>

<style>
</style>