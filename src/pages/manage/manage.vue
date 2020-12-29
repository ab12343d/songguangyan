<template>
  <div>
    <el-button class="btn" type="primary" @click="wiAdd">添加</el-button>
    <v-list :info="info" :arr="arr" @sets="sets" @paging="paging" @meits="meits" :user="user" @init="init"></v-list>
    <v-app :info="info" :listr="listr" ref="add" @paging='paging'  @init="init"></v-app>
  </div>
</template>
<script>
import vApp from "./components/add.vue";
import vList from "./components/list.vue";
import { mapGetters, mapActions } from "vuex";
import { reqUsercount, reqUserlist } from "../../utils/http";
export default {
  components: {
    vApp,
    vList
  },
  computed: {
    ...mapGetters({
      listr: "listr"
    })
  },
  data() {
    return {
      //  管理员列表分页
      user: {
        size: 3,
        page: 1
      },
      arr: [], //  获取管理员列表

      info: {
        total: 1, //页数
        isshow: false, //弹框锁
        iss: true //修改添加锁
      }
    };
  },
  methods: {
    ...mapActions({
      reqRole: "reqRoleAll"
    }),
    //   点击添加按钮
    wiAdd() {
      this.info.isshow = true;
      this.info.iss = true;
    },
    // 封装获取数据 便于刷新列表
    inits() {
      this.reqRole();
    },

    //  封装管理员总数
    init() {
      reqUsercount().then(res => {
        if (res.data.code == 200) {
          this.info.total = res.data.list[0].total;
        }
      });
    },
    // 封装管理员列表（分页）
    sets(a) {
      this.user.page = a;
      //  console.log( this.user.page)
      this.paging();
    },
    paging() {
      reqUserlist(this.user).then(res => {
        if (res.data.code == 200) {
         /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
          if(res.data.list.length==0&&this.user.page>1){
            this.user.page--
            this.paging()
            return
          }
          this.arr = res.data.list;
        }
      });
    },
    //  list子组件传过来编辑按钮
    meits(uid) {
      this.info.isshow = true;
      this.info.iss = false;
      this.$refs.add.getOne(uid);
    }
  },
  // 获取便利目录列表
  mounted() {
    this.inits();
    this.init();
    this.paging();
  }
};
</script>

<style scoped>
.btn {
  margin: 20px 0;
}
</style>