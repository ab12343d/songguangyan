<template>
  <div>
    <el-button class="btn" type="primary" @click="wiAdd">添加</el-button>
    <!-- 表单 -->
    <v-list :info="info" @inits="inits" :listr="listr" @emit='emit($event)'></v-list>
    <!-- 弹框 -->
    <v-add :info="info" :list="list"  @inits="inits"  ref='add'></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import { mapGetters, mapActions } from "vuex";
// import { reqRolelist } from "../../utils/http";
export default {
  components: {
    vAdd,
    vList
  },
  computed: {
    ...mapGetters({
      list: "list",
      listr:'listr'
    })
  },

  data() {
    return {
      info: {
        isshow: false, //弹框锁
        iss: true //修改添加锁
      }
    };
  },
  methods: {
    ...mapActions({
      reqList: "reqListAll",
      reqRole:'reqRoleAll'
    }),
    //   点击添加按钮
    wiAdd() {
      this.info.isshow = true;
      this.info.iss = true;
    },
    // 封装获取列表便于后面操作更新数据
    init() {
      this.reqList();
    },
    // 封装获取数据 便于刷新列表
    inits() {
      // reqRolelist().then(res => {
      //   if (res.data.code == 200) {
      //     this.listr = res.data.list;
      //   }
      // });
      this.reqRole()
    },
    emit(id){
           // 弹框里编辑按钮
      this.info.iss = false;
      // 出现弹框获取一条数据
      this.info.isshow= true;
      this.$refs.add.obtain(id)
    }
  },
  // 获取便利目录列表
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.btn {
  margin: 20px 0;
}
</style>