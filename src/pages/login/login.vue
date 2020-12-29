<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <div class="ipt">
        <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
      </div>
      <div class="ipt">
        <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
      </div>
      <div class="center">
        <el-button class="btn" type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUserlogin } from "../../utils/http";
import { successalert } from "../../utils/alert";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      reqUserlogin(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$router.push("/");
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
h3 {
  font-size: 20px;
}
.con {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.ipt {
  width: 350px;
  margin: 15px auto;
}
.center {
  text-align: center;
}
.btn {
  width: 350px;
}
</style>