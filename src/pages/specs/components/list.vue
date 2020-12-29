<template>
  <div>
    <!-- 24.遍历list -->
    <!-- :tree-props="{children:'哪个字段用来判断有下一层'}" -->
    <el-table
      :data="arr"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="130"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="130"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" sortable width="605">
        <template slot-scope="scope">
          <el-tag v-for="item in JSON.parse(scope.row.attrs) " :key="item.id">{{item}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态" sortable width="130">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" sortable width="130">
        <template slot-scope="scope">
          <el-button type="primary" @click="meit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 一、分页
    prev表示上一页，
    next为下一页，
    pager表示页码列表
    total表示总条目数，默认一页10条
    page-size 每一页的数量
    current-change	currentPage 改变时会触发
    -->
    <el-pagination
      :page-size="user.size"
      layout="prev, pager, next"
      @current-change="current"
      :total="info.total"
    ></el-pagination>
  </div>
</template>

<script>
import { resSpecsdelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "arr", "user"],
  data() {
    return {
      list: [],
      imageUrl: ""
    };
  },
  methods: {
    current(a) {
      this.$emit("sets", a);
    },
    // 点击删除
    del(id) {
      resSpecsdelete({ id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("paging");
          // 更新总页数
          this.$emit("init");
        }
      });
    },
    aa(e) {
      console.log(e);
    },
    // 点击编辑按钮
    meit(id) {
      this.$emit("meit", id);
    }
  }
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>