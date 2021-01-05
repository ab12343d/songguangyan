<template>
  <div>
   
    <el-dialog
      :title="info.iss?'商品添加':'商品修改'"
      @closed="cancel"
      @opened="opened"
      :visible.sync="info.isshow"
    >
      <el-form :model="user">
        <el-form-item label="一级分类">
          <el-select v-model="user.first_cateid" @change="xiugonw">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px">
          <!-- 原生js的上传文件 -->
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="user.specsid" @change="xiu">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in pecsListAll" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            active-color="#13ce66"
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isshow"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="info.iss" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="emit">修 改</el-button>
        <el-button type="primary">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import {
  resCatelist,
  resGoodsadd,
  reqGoodsedit,
  reqGoodsinfo
} from "../../../utils/http";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      imgUrl: "",
      // 1.初始化数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的是数组字符串，所以在发请求之前，需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1
      },
      //4.二级分类的列表
      secondCateList: [],
      // 二级分类规格
      pecsListAll: [],
      // 商品规格
      guig: ""
    };
  },
  computed: {
    ...mapGetters({
      // 商品列表一级
      list: "cate",
      specsList: "specs/list"
      //  二级
    })
  },
  methods: {
    ...mapActions({
      reqList: "reqCodeAll",
      resSpecslist: "specs/reqList",
      reqList1: "goods/reqGoods"
    }),
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid == "") {
          erroralert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname == "") {
          erroralert("商品名称不能为空");
          return;
        }
        if (this.user.price == "") {
          erroralert("价格不能为空");
          return;
        }
        if (this.user.market_price == "") {
          erroralert("市场价格不能为空");
          return;
        }
        if (!this.user.img) {
          erroralert("请上传图片");
          return;
        }
        if (this.user.specsid == "") {
          erroralert("商品规格不能为空");
          return;
        }
        if (this.user.specsattr.length == 0) {
          erroralert("规格属性不能为空");
          return;
        }
        if (this.user.description == "") {
          erroralert("商品描述不能为空");
          return;
        }
        resolve();
      });
    },
    // 清空
    empty() {
      this.imgUrl = "";
      // 1.初始化数据
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的是数组字符串，所以在发请求之前，需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1
      };
      //4.二级分类的列表
      this.secondCateList = [];
      // 二级分类规格
      this.pecsListAll = [];
      // 商品规格
      this.guig = "";
    },
    // 点击添加按钮
    add() {
      this.user.description = this.editor.txt.html();
      this.checkProps().then(() => {
        //取出富文本编辑器的内容，赋值给user

        // 由于后端要的specsattr是数组字符串，前端需要是数组，所以要拷贝、处理一下，再发送；
        // 但是由于有对象（img）,所以不能使用JSON.parse(JSON.stringify())拷贝，需要使用...

        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr)
        };
        resGoodsadd(data).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            //弹框消失
            this.cancel();
            // 清空
            this.empty();
            // 刷新列表
            this.reqList1();
          }
        });
      });
    },
    One(id) {
      reqGoodsinfo({ id }).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          // 重新获取二级分类的list
          this.getListwon();
          // 重新获取图片
          this.imgUrl = this.$pre + this.user.img;
          // 重新获取规格
          this.user.specsattr = JSON.parse(this.user.specsattr);
          this.user.id = id;
          //将user.desctiption赋值给富文本编辑器
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    // 取消
    cancel() {
      if (!this.info.iss) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 点击修改
    emit() {
      //取出富文本编辑器的内容，赋值给user
      this.user.description = this.editor.txt.html();
      this.checkProps().then(() => {
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr)
        };
        reqGoodsedit(data).then(res => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            // 清空
            this.empty();
            // 刷新列表
            this.reqList1();
            //弹框消失
            this.cancel();
          }
        });
      });
    },
    // 触发一级chage事件修改二级是事件id
    xiugonw() {
      // 每次重选一级分类时 二级分类要清除
      this.user.second_cateid = "";
      this.getListwon();
    },
    xiu() {
      this.user.specsattr = "";
      this.getspecs();
    },
    //根据一级分类，计算出二级分类的list
    getListwon() {
      resCatelist({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },

    // 获取规格二级表
    getspecs() {
      let obj = this.specsList.find(item => item.id == this.user.specsid);
      this.pecsListAll = obj ? obj.attrs : [];
    },
    //js 上传文件
    changeImg(e) {
      let file = e.target.files[0];
      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //后缀名
      //   let extname=file.name.slice(file.name.lastIndexOf("."));
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some(item => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      // 将文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);
      //赋值给user.img
      this.user.img = file;
    },
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.user.description);
    }
  },

  mounted() {
    // 获取商品分类
    // 如果没有请过分类数据，就发一下请求
    if (this.reqList.length == 0) {
      this.reqList();
    }
    // 请求规格list
    this.resSpecslist(true);
  }
};
</script>

<style scopen>
/* 原生js的样式 */
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>