<template>
  <div>
    <el-dialog :title="info.iss?'角色添加':'角色编辑'" :visible.sync="info.isshow" @closed="empty">
      <el-form :model="form">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 树形控件 
          data：展示的数据 
          show-checkbox：展示选择框
          node-key:每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          default-expanded-keys :默认展开
          default-checked-keys：默认选中
          :props="{children: '用来判断有没有下一个子节点的字段',label: '展示的内容的字段'}"
          this.$refs.tree.getCheckedNodes() 取到选中的数据的所有信息
          this.$refs.tree.getCheckedKeys() 取到选中的数据的node-key拼成的数组
        -->
        <el-form-item>
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            :default-checked-keys="menuss"
            ref="tree"
            :props="defaultProps"
            @check-change="change"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="info.iss" @click="add()">添 加</el-button>
        <el-button type="primary" v-else @click="emitt">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqRoleadd, reqRoleinfo, reqRoleedit } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      menuss: [], //创建接受新复选框点击的key
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser"
    }),
    // 清空数据方法
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        menuss: [],
        status: 1
      };
      // 清空多选框样式
      this.$refs.tree.setCheckedKeys([]);
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.from.rolename == "") {
          erroralert("角色名称不能为空");
          return;
        }
        resolve();
      });
    },
    // 点击添加按钮
    add() {
      this.checkProps().then(() => {
        reqRoleadd(this.form).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            // 关闭弹框
            successalert(res.data.msg);
            this.info.isshow = false;
            // 重新获取数据
            this.$emit("inits");
            // 清空数据
            this.empty();
          }
        });
      });
    },
    // 点击多选框
    change() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    },
    // 获取一条角色数据
    obtain(id) {
      reqRoleinfo(id).then(res => {
        // 把获取的值赋值上
        this.form = res.data.list;
        // 手动添加id
        this.form.id = id;
        // 将新复选框的key赋值
        this.menuss = JSON.parse(this.form.menus);
      });
    },
    // 点击修改按钮
    emitt() {
      //先取出树形控件的数据给menus，再发请求
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // 先取出属性空间的数据给menus，在发送请求
      reqRoleedit(this.form).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          //如果修改的角色，是当前用户所属的角色，就需要退出登录，重新登录
          if (this.form.id == this.userInfo.roleid) {
            this.changeUser({});
            this.$router.push("/login");
            return;
          }
          // 弹框消失
          this.info.isshow = false;
          // 更新数据
          this.$emit("inits");
        }
      });
    }
  }
};
</script>

<style>
</style>