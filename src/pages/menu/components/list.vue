<template>
  <div>
    <!-- :tree-props="{children:'哪个字段用来判断有下一层'}" -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column label="菜单编号" prop="id"></el-table-column>
      <el-table-column label="菜单名称" prop="title" width="170"></el-table-column>
      <el-table-column label="菜单图标" prop="icon" width="170">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="菜单地址" prop="url" width="170"></el-table-column>
      <el-table-column label="状态" width="170">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain @click="dele(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqMenudelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    //  删除文件
    dele(id) {
      this.$confirm("是否要删除该文件？！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确认进行删除操作
        .then(() => {
          reqMenudelete({ id }).then(res => {
            if (res.data.code == 200) {
              // 删除成功刷新页面并弹框删除成功
              successalert(res.data.msg);
              this.$emit("init");
            }
          });
        })
        //点击取消
        .catch(() => {});
    },
    // 点击编辑按钮
    willEdit(id){
   
      this.$emit('willEdit',id)
    }
  }
};
</script>

<style scoped>
</style>