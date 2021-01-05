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

          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 单纯是菜单 -->
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <!-- 有目录，有菜单 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group >
                <!-- 实现跳转 -->
                <el-menu-item v-for="it in item.children" :key="it.path" :index="it.url">{{it.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header class="da">
          <h3>{{userInfo.username}}</h3>
          <el-button  type="danger" plainclass="tuic" @click="tuic">退出登录</el-button>
        </el-header>

        <!-- {{$store.state.list}} -->
        <!-- 中间内容 -->
        <el-main>
          <!-- 路由入口 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.name">{{$route.name}}</el-breadcrumb-item>
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
      list: "list",
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      reqList: "reqListAll",
      changUser: "changUser"
    }),
    tuic() {
      this.changUser({});
      this.$router.replace("/login");
    }
  },
  mounted() {
    this.reqList();
    // console.log(this.$store);
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
a {
  display: inline-block;
  color: #fff;
  font: 14px "微软雅黑";
  text-indent: 60px;
  margin: 10px 0;
}
.da {
  display: flex;
}

</style>