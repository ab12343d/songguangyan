<template>
  <div>
    <!-- closed	Dialog 关闭动画结束时的回调 -->
    <el-dialog :title="info.iss?'菜单添加':'菜单修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" label-width="100px">
          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="one">
            <el-option value label="--请选择分类--" disabled></el-option>
            <!-- 需要一段数据 -->
            <el-option v-for="item in list" :label="item.catename" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="tow">
            <el-option value label="--请选择分类--" disabled></el-option>
            <!-- 需要一段数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option value label="--请选择分类--" disabled></el-option>
            <!-- 需要一段数据 -->
            <el-option
              v-for="item in sectowCateList"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.iss" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="emits">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  resCatelist,
  resGoodslist,
  reqSeckadd,
  reqSeckinfo,
  reqSeckedit
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      // 一级分类
      list: {},
      //   二级分类
      secondCateList: [],
      //   三级分类
      sectowCateList: [],
      //   时间戳
      value1: [],
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }
    };
  },
  methods: {
    checkProps() {
      return new Promise(resolve => {
        if (this.user.title == "") {
          erroralert("活动名称不能为空");
          return;
        }
        this.user.begintime = this.value1[0];
        if (this.user.begintime == undefined) {
          erroralert("开始时间不能为空");
          return;
        }
        this.user.endtime = this.value1[1];
        if (this.user.endtime == undefined) {
          erroralert("结束时间不能为空");
          return;
        }
        if (this.user.first_cateid == "") {
          erroralert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.user.goodsid == "") {
          erroralert("商品不能为空");
          return;
        }
        resolve();
      });
    },
    cancel() {
      //45.编辑清空数据
      if (!this.info.isshow) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.value1 = [];
    },
    //   选中一级某个选项获取到二级对应的
    one() {
      // 每次重选一级分类时 二级分类要清除
      this.user.second_cateid = "";
      this.getListwon();
    },
    tow() {
      // 选二级分类时三级分类要清除
      this.user.goodsid = "";
      // 获取三级分类
      this.getListstr();
    },
    // 获取二级
    getListwon() {
      //   获取二级分类
      resCatelist({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    getListstr() {
      // 获取三级分类商品
      resGoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
        this.sectowCateList = res.data.list;
      });
    },
    // 点击添加
    add() {
      this.checkProps().then(() => {
        this.user.begintime = this.value1[0];
        this.user.endtime = this.value1[1];
        reqSeckadd(this.user).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.cancel();
            this.$emit("init");
          }
        });
      });
    },
    toOwn(id) {
      reqSeckinfo({ id }).then(res => {
        if (res.data.code == 200) {
          // 时间戳渲染补上
          this.$set(this.value1, 0, res.data.list.begintime);
          this.$set(this.value1, 1, res.data.list.endtime);
          this.user = res.data.list;
          // 手动添加id
          this.user.id = id;
        }
      });
    },
    // 点击修改按钮
    emits() {
      this.checkProps().then(() => {
        this.user.begintime = this.value1[0];
        this.user.endtime = this.value1[1];
        reqSeckedit(this.user).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.$emit("init");
          }
        });
      });
    }
  },
  mounted() {
    //   获取一级分类
    resCatelist({ istree: true }).then(res => {
      if (res.data.code == 200) {
        this.list = res.data.list;
      }
    });
  }
};
</script>

<style scoped>
.time {
  display: flex;
  margin: 20px 0;
}
</style>