<template>
  <div>
    <el-container class="index">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <!-- 侧边栏 
    background-color 背景色
    text-color 文字的颜色
    active-text-color 激活的时候文字的颜色
    unique-opened	是否只保持一个子菜单的展开
    router 开启路由模式，index就是配置path
          -->
          <!-- 左边导航栏 -->
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu :index="item.id+''" v-for="item in $store.state.list" :key="item.path">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="it in item.children" :key="it.path">
              <el-menu-item is="router-link" :to="it.url">{{it.title}}</el-menu-item>
              <!-- <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>

          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-menu-item-group>-->
          <!-- </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- {{$store.state.list}} -->
        <!-- 中间内容 -->
        <el-main>
          <!-- 路由入口 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item  v-if="$route.name">{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {

  computed: {
    ...mapGetters({
      list: "list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "reqListAll"
    })
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style scoped>
.index {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.con {
  padding-top: 20px;
}
a{
  display: inline-block;
  color: #fff;
  font:14px '微软雅黑';
 text-indent: 60px;
}
</style>