<template>
  <div>
     <!-- closed	Dialog 关闭动画结束时的回调 -->
    <el-dialog :title="info.iss?'菜单添加':'菜单修改'" @closed="cancel" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="100px" >
          <el-select v-model="user.pid" @change="chenge">
            <!-- <el-option label="商城管理"></el-option> -->
            <el-option label="顶级菜单" :value="0"></el-option>
             <!-- 需要一段数据 -->
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.title"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="图标管理" label-width="100px" v-if='user.type==1'>
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value=" '/'+item.path"
              :lable="item.name+ '-/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status"  active-color="#13ce66" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.iss">确 定</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
      <!-- {{user}} -->
    </el-dialog>
  </div>
</template>

<script>
import { indexRoutes } from "../../../router/index";
import { reqMenuAdd, reqMenuinfo,reqMenuedit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info",'list'],
  data() {
    return {
      user: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: ""
      },
      icons: ["el-icon-edit", "el-icon-s-goods", "el-icon-camera",'el-icon-setting','el-icon-goods'],
      indexRoutes
    };
  },
  methods: {
    // 清空user内容
    empty() {
      this.user = {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    // 关闭弹框 点击取消
    cancel() { 
      // 当前是添加的时候清空表单里的数据
      if(!this.info.iss){
        this.empty()
      }
        this.info.isshow = false;
    },
    // 点击确定按钮进行添加
    add() {
      reqMenuAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          // 弹框消失
          this.cancel();
          // user内容清空
          this.empty();
          // 更新列表
          this.$emit("init");
        }
      });
    },
    // 获取一条管理信息
    getOne(id) {
      reqMenuinfo(id).then(res=>{
        if(res.data.code==200){
          // 更新当前获取的user信息
          this.user =res.data.list
          //  手动添加id
          this.user.id=id
        }
      })
    },
    // 点击修改按钮
    edit(){
      reqMenuedit(this.user).then(res=>{
        // 修改成功弹框消失
        this.info.isshow = false
        // 数据更新
        this.$emit('init')
        successalert(res.data.msg)
      })
    },
  // 如果选了”顶级菜单“,就是目录，否则，就是菜单
    // 修改顶级菜单
    chenge(){
      if(this.user.pid == 0){
        this.user.type =1
      }else{
        this.user.type =2
      }
    }
  }
};
</script>

<style scoped>
</style>