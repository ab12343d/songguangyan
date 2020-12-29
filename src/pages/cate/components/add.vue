<template>
  <div>
    <!-- closed	Dialog 关闭动画结束时的回调 -->
    <el-dialog :title="!info.iss?'菜单添加':'菜单修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 需要一段数据 -->
            <el-option v-for="item in cate" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl"  :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            active-color="#13ce66"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.iss">添 加</el-button>
        <el-button type="primary" @click="emits" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resCateadd, resCateinfo, resCateedit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "cate"],
  data() {
    return {
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      imageUrl: ""
    };
  },

  methods: {
    // 清空user
    empty() {
      this.imageUrl = "",
        this.user = {
          pid: "",
          catename: "",
          img: null,
          status: 1
        };
    },
    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击添加按钮
    add() {
      resCateadd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.info.isshow = false;
          this.empty();
          this.$emit("init");
        }
      });
    },
    cancel() {
      //45.编辑清空数据
      if (!this.info.isshow) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 获取图片
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    // 获取一条商品
    resOne(id) {
      resCateinfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 处理图片
          this.user.id = id;
          this.imageUrl = this.$pre + this.user.img;
        }
      });
    },
    // 点击编辑按钮
    emits() {
      resCateedit(this.user).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.info.isshow = false;
          this.empty();
          this.$emit("init");
        }
      });
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>