<template>
  <div>
    <el-dialog :title="info.iss?'角色添加':'角色修改'" @closed="cancel" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid">
            <el-option v-for="item in listr" :key="item.id" :value="item.id" :label="item.rolename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off" :value="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            :value="form.password"
            show-password
          ></el-input>
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
        <el-button type="primary" @click="add" v-if="info.iss">添 加</el-button>
        <el-button type="primary" @click="emtis" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqUseradd, reqUserinfo, reqUseredit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info", "listr"],
  data() {
    return {
      input: "",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.form.roleid == "") {
          erroralert("所属角色不能为空");
          return;
        }
        if (this.form.username == "") {
          erroralert("用户名不能为空");
          return;
        }
        if (this.form.password == "") {
          erroralert("密码不能为空");
          return;
        }
        resolve()
      });
    },
    // 清空user内容
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: ""
      };
    },
    // 关闭弹框 点击取消
    cancel() {
      // 当前是添加的时候清空表单里的数据
      if (!this.info.iss) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 点击添加按钮
    add() {
      this.checkProps().then(() => {
        reqUseradd(this.form).then(res => {
          if (res.data.code == 200) {
            this.info.isshow = false;
            successalert(res.data.msg);
            // 更新页面信息
            this.$emit("paging");
            // 清空数据
            this.empty();
            // 添加完成更新总页数
            this.$emit("init");
          }
        });
      });
    },
    //  管理员获取（一条）
    getOne(uid) {
      reqUserinfo({ uid }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
        }
      });
    },
    // 点击修改按钮修改数据
    emtis() {
      reqUseredit(this.form).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.info.isshow = false;
          this.$emit("paging");
        }
      });
    }
  }
};
</script>

<style>
</style>