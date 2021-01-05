<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" autocomplete="off" :value="form.username"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname" autocomplete="off" :value="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            :value="form.password"
            show-password
          ></el-input>
          <p>留空则不改</p>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            active-color="#13ce66"
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="emtis">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resMemberinfo, resMemberdit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info", "listr"],
  data() {
    return {
      input: "",
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    checkProps() {
      return new Promise((resslve, resject) => {
        if (this.form.nickname == "") {
          erroralert("手机号不能为空");
          return;
        }
        if (this.form.phone == "") {
          erroralert("用户名不能为空");
          return;
        }
        if (this.form.password == "") {
          erroralert("密码不能为空");
          return;
        }
        resslve();
      });
    },
    // 清空user内容
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1
      };
    },
    //  管理员获取（一条）
    getOne(uid) {
      resMemberinfo({ uid }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.form = res.data.list;
        }
      });
    },
    // 点击修改按钮修改数据
    emtis() { 
      this.checkProps().then(() => {
        resMemberdit(this.form).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.$emit("init");
          }
        });
      });
    }
  }
};
</script>

<style>
</style>