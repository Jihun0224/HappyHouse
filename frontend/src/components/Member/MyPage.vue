<template>
  <b-modal id="my-page" title="My Page" centered hide-footer>
    <div id="form">
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

      <b-input-group>
        <b-input-group-prepend is-text
          ><b><b-icon icon="lock-fill" scale="1"></b-icon></b
        ></b-input-group-prepend>
        <b-form-input
          v-model="passwordCheck"
          type="password"
          placeholder="Password Check"
        ></b-form-input>
      </b-input-group>

      <b-input-group>
        <b-input-group-prepend is-text
          ><b><b-icon icon="person-bounding-box" scale="1"></b-icon></b
        ></b-input-group-prepend>
        <b-form-input
          v-model="name"
          type="text"
          placeholder="Name"
        ></b-form-input>
      </b-input-group>

      <b-input-group>
        <b-input-group-prepend is-text
          ><b><b-icon icon="envelope-fill" scale="1"></b-icon></b
        ></b-input-group-prepend>
        <b-form-input
          v-model="email"
          type="email"
          placeholder="Email"
        ></b-form-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend is-text
          ><b><b-icon icon="telephone-fill" scale="1"></b-icon></b
        ></b-input-group-prepend>
        <b-form-input
          v-model="phone"
          type="tel"
          placeholder="Phone Number"
        ></b-form-input>
      </b-input-group>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-warning">등록</button>
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
.input-group {
  margin-bottom: 15px;
  width: 250px;
}
</style>