<template>
  <div>
    <el-table :data="listr" stripe style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="primary" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="emit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="dele(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoledelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "listr"],
  methods: {
    // 点击编辑按钮
    emit(id) {
      //  给父组件传输id
      this.$emit("emit", id);
    },

    // 点击删除按钮
    dele(id) {
      this.$confirm("是否要删除该文件？！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确认进行删除操作
        .then(() => {
          reqRoledelete({ id }).then(res => {
            if (res.data.code == 200) {
              successalert(res.data.msg);
              this.$emit("inits");
            }
          });
        })
        //点击取消
        .catch(() => {});
    }
  },
  mounted() {
    this.$emit("inits");
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>