<template>
  <div>
     <!-- 24.遍历list -->
    <!-- :tree-props="{children:'哪个字段用来判断有下一层'}" -->
    <el-table
     :data="cate"  
     style="width: 100%; margin-bottom: 20px;"
     row-key="id"
      border
      :tree-props="{children: 'children'}"
      >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column label="图片" sortable width="180">
         <template slot-scope="scope">
              <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt="">
          </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="meit(scope.row.id)">编辑</el-button>
          <del-btn  @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { resCatedelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info",'cate'],
  data() {
    return {
      list: [],
      imageUrl: ""
    };
  },
  methods: {
   
    // 点击删除
    del(id){
      resCatedelete({id}).then(res=>{
        if(res.data.code =200){
          successalert(res.data.msg)
          this.$emit('init')
        }
      })
    },
    // 点击编辑按钮
    meit(id){
      this.$emit('meit',id)
    }
  }
};
</script>

<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>