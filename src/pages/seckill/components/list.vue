<template>
  <div>
    <!-- 24.遍历list -->
    <!-- :tree-props="{children:'哪个字段用来判断有下一层'}" -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" sortable width="300"></el-table-column>

      <el-table-column label="状态" sortable width="200">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="meit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqSeckdelete} from '../../../utils/http'
import {erroralert} from '../../../utils/alert'
export default {
  props: ["info", "list"],
  data() {
    return {};
  },
  methods: {
    //   点击删除
    del(id) {
        reqSeckdelete({id}).then(res=>{
            if(res.data.code==200){
                erroralert(res.data.msg)
                this.$emit('init')
            }
        })
    },
    meit(id){
        this.$emit('meit',id)
    }
  }
};
</script>

<style scoped>
</style>