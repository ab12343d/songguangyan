<template>
  <div>
    <el-dialog :title="info.iss?'规格添加':'规格修改'" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称">
          <div class="guig">
            <el-input v-model="form.specsname" autocomplete="off"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="规格属性">
          <div class="guig">
            <el-input v-model="lis" autocomplete="off"></el-input>
            <el-button class="btn" type="primary" @click="tigu">新增规格属性</el-button>
          </div>
        </el-form-item>

        <el-form-item label="规格属性" v-for="(item,index) in form.attrs" :key="index">
          <div class="guig">
            <el-input v-model="form.attrs[index]" autocomplete="off"></el-input>
            <el-button type="danger" @click="dele(index)">删除</el-button>
          </div>
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
import { resSpecsinfo, resSpecsedit, resSpecsadd } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      input: "",
      form: {
        specsname: "",
        attrs: [""],
        status: 1
      }
    };
  },
  methods: {
    checkProps() {
      return new Promise(resolve => {
        if (this.form.specsname === "") {
          erroralert("规格名称不能为空");
          return;
        }
        if (this.form.attrs.some(item => item == "")) {
          erroralert("规格不能为空");
          return;
        }
        resolve();
      });
    },
    // 点击添加规格
    tigu() {
      this.form.attrs.push("");
    },
    // 点击删除
    dele(index) {
      this.form.attrs.splice(index, 1);
    },
    // 点击添加
    add() {
      let obj = JSON.parse(JSON.stringify(this.form));
      obj.attrs = JSON.stringify(obj.attrs);

      this.checkProps().then(() => {
        resSpecsadd(obj).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.$emit("paging");
            this.empty();
            // 更新总页数
            this.$emit("init");
          }
        });
      });
    },
    // 清空user内容
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1
      };
    },
    //  管理员获取（一条）
    getOne(id) {
      resSpecsinfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          console.log(this.form);
          this.form.attrs = JSON.parse(this.form.attrs);
          this.form.id = id;
        }
      });
    },
    // 点击修改按钮修改数据
    emtis() {
      this.checkProps().then(() => {
        let obj = JSON.parse(JSON.stringify(this.form));
        obj.attrs = JSON.stringify(obj.attrs);
        resSpecsedit(this.form).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.$emit("paging");
            this.empty();
          }
        });
      });
    }
  },
  // 计算属性让每个添加的lis和form attrs实时更新
  computed: {
    lis() {
      return JSON.stringify(this.form.attrs);
    }
  }
};
</script>

<style scoped>
.guig {
  display: flex;
}
</style>