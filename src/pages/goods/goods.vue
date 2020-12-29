<template>
  <div>
    <el-button class="but" @click="wadd" type="primary">添加</el-button>
    <v-list :info='info' @willEdit='willEdit'></v-list>
    <v-add :info='info' ref='add'></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";

export default {
  components: {
    vAdd,
    vList
  },
  data () {
    return {
     info:{
       isshow:false,
       iss:true
     }  
    }
  },
  methods: {
    // 点击添加
    wadd(){
      this.info.isshow=true
      this.info.iss=true
    },
    willEdit(id){
      this.$refs.add.One(id)
    }
  }
};
</script>

<style scoped>
.but{
    margin: 20px 0;
}
</style>