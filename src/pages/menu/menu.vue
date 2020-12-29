<template>
  <div>
    <el-button class="btn" type="primary" @click="wliAdd">添加</el-button>
    <!-- 数据表格 -->
    <v-list :list="list" @init="init" @willEdit="willEdit($event)"></v-list>
    <!-- 弹框 -->
    <v-add :info="info" :list='list' @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
// import { reqMenulist } from "../../utils/http";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    vAdd,
    vList
  },
   computed: {
    ...mapGetters({
      list: "list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "reqListAll"
    }),
    // 窗口弹出按钮 点添加按钮
    wliAdd() {
      // 弹框出现
      this.info.isshow = true;
      // 弹框编辑按钮消失
      this.info.iss = true;
    },
    // 封装获取列表便于后面操作更新数据
    init() {
      // reqMenulist().then(res => {
      //   if (res.data.code == 200) {
      //     this.list = res.data.list;
      //   }
      // });
       this.reqList();
      
      // console.log(this.$store.state.list)
    },
    // list传过来的编辑按钮指令获取该id的信息
    willEdit(id) {
      // 将弹框里确认和修改按钮的锁锁上
      this.info.iss = false;
      //  弹出框
      this.info.isshow = true;
      // 调用子add的方法
      this.$refs.add.getOne(id);
    }
  },
  // 获取列表
  mounted() {
    this.init();
  },
  data() {
    return {
      info: {
        isshow: false, //弹框锁
        iss: true //判断打开的是添加还是编辑
      },
    };
  }
};
</script>

<style scoped>
.btn {
  margin: 20px 0;
}
</style>