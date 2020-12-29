<template>
  <div>
    <el-table :data="arr" stripe style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="meits(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="dele(scope.row.uid)">删除</el-button>
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
      :pager-count="11"
      layout="prev, pager, next"
      @current-change="current"
      :total="info.total"
    ></el-pagination>
  </div>
</template>

<script>
import { reqUserdelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "arr", "user"],
  data() {
    return {
      list: []
    };
  },
  methods: {
    current(a) {
      this.$emit("sets", a);
    },
    // 点击删除按钮
    dele(uid) {
      this.$confirm("是否要删除该文件？！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确认进行删除操作
        .then(() => {
          reqUserdelete({ uid }).then(res => {
            if (res.data.code == 200) {
              successalert(res.data.msg);
              // 更新列表
              this.$emit("paging");
              // 更新总页数
              this.$emit("init");
            }
          });
        })
        //点击取消
        .catch(() => {});
    },
    // 点击编辑按钮
    meits(uid) {
      this.$emit("meits", uid);
    }
  }
};
</script>

<style>
</style>