<template>
  <div>
    <el-button class="btn" type="primary" @click="wliAdd">添加</el-button>
    <v-list :info="info" :cate="cate" @init="init" @meit="meit"></v-list>
    <v-add :info="info" :cate="cate" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    vAdd,
    vList
  },
  computed: {
    ...mapGetters({
      cate: "cate"
    })
  },
  methods: {
    ...mapActions({
      reqCate: "reqCodeAll",
      // 封装获取列表便于后面操作更新数据
      init() {
        this.reqCate();
      },
      // 点击添加按钮
      wliAdd() {
        this.info.isshow = true,
         this.info.iss = true;
      }
    }),
    meit(id) {
      this.info.isshow = true;
      this.info.iss = false;
      this.$refs.add.resOne(id);
    }
  },
  // 获取列表
  mounted() {
    this.init();
  },

  data() {
    return {
      list: [],
      info: {
        isshow: false, //控制弹框
        iss: true //点击确定按钮还是修改按钮
      }
    };
  }
};
</script>

<style scoped>
.btn {
  margin: 20px 0;
}
</style>