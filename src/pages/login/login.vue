<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <el-form :model="user" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
        </el-form-item>
        <div class="center">
          <el-button class="btn" type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqUserlogin } from "../../utils/http";
import { successalert } from "../../utils/alert";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser"
    }),
    login() {
      reqUserlogin(this.user).then(res => {
        if (res.data.code == 200) {
          this.changeUser(res.data.list);
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