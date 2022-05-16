<template>
  <b-modal id="sign-up" title="회원가입" centered hide-footer>
    <div id="form">
      <b-form-input v-model="id" type="text" placeholder="ID"></b-form-input>
      <b-form-input
        v-model="password"
        type="password"
        placeholder="Password"
      ></b-form-input>
      <b-form-input
        v-model="passwordCheck"
        type="password"
        placeholder="Password Check"
      ></b-form-input>
      <b-form-input
        v-model="name"
        type="text"
        placeholder="Name"
      ></b-form-input>
      <b-form-input
        v-model="email"
        type="email"
        placeholder="Email"
      ></b-form-input>
      <b-form-input
        v-model="phone"
        type="tel"
        placeholder="Phone Number"
      ></b-form-input>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-warning" onclick="signUp()">
        등록
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
      passwordCheck: "",
      name: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    regist() {
      if (
        this.id === "" ||
        this.password === "" ||
        this.name === "" ||
        this.email === "" ||
        this.phone === ""
      ) {
        alert("모든 내용을 입력해주세요");
        return;
      }

      //   let user = {
      //     id: this.id,
      //     password: this.password,
      //     name: this.name,
      //     email: this.email,
      //     phone: this.phone,
      //   };
      //axios 부분 추가
    },
  },
};
</script>

<style >
#sign-up {
  justify-content: center;
}
#form {
  margin-bottom: 30px;
  justify-content: center;
}
.form-control {
  margin-bottom: 15px;
  width: 250px;
}
</style>