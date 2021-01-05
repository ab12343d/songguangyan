<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="产品编号"></el-table-column>
      <el-table-column prop="goodsname" label="产品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="是否继续">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)">编辑</el-button>
          <del-btn type="danger" @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  -->
  <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsdelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      //总数
      total: "goods/total",
      //一页的数量
      size: "goods/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqGoods",
      reqTotal: "goods/reqTotal",
      changePage: "goods/changePage"
    }),
    init() {
      this.reqList();
    },
    // 点击删除
    del(id) {
      reqGoodsdelete({ id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.init();
          //总数
          this.reqTotal();
        }
      });
    },
    // 点击修改
    willEdit(id) {
      this.info.isshow = true;
      this.info.iss = false;
      this.$emit("willEdit", id);
    }
  },
  mounted() {
    this.init();
     this.reqTotal();
  }
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>