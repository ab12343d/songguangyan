<template>
  <div>
    <el-button class="btn" type="primary" @click="wadd">添加</el-button>
    <v-list :info="info" :arr='arr' @paging='paging' @meit='meit' @init='init' :user='user' @sets='sets'></v-list>
    <v-app :info="info" @paging='paging' ref='add' @init='init'></v-app>
  </div>
</template>

<script>
import vApp from "./components/add.vue";
import vList from "./components/list.vue";
import { resSpecscpunt, resSpecslist } from "../../utils/http";
export default {
  components: {
    vApp,
    vList
  },
  data() {
    return {
      info: {
        isshow: false,
        iss: true,
        total:1
      },
      //  管理员列表分页
      user: {
        size: 3,
        page: 1
      },
      arr: [] //  获取管理员列表
    };
  },
  methods: {
        // 封装管理员列表（分页）
    sets(a) {
      this.user.page = a;
      this.paging();
    },
    //   点击添加按钮
    wadd() {
      this.info.isshow = true; 
      this.info.iss = true;
    },
    //  封装管理员总数
    init() {
      resSpecscpunt().then(res => {
        if (res.data.code == 200) {
          this.info.total = res.data.list[0].total;
        }
      });
    },
    paging() {
      console.log(this.user)
      resSpecslist(this.user).then(res => {
        if (res.data.code == 200) {
          /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
          if (res.data.list.length == 0 && this.user.page > 1) {
            this.user.page--;
            this.paging();
            return;
          }
          this.arr = res.data.list;
        }
      });
    },
    meit(id){
        this.info.isshow = true;
      this.info.iss = false;
       this.$refs.add.getOne(id);
    }
  },
  mounted() {
    this.init();
    this.sets(1)
  }
};
</script>

<style scoped>
.btn {
  margin: 20px 0;
}
</style>