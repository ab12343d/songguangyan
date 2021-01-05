<template>
  <div>
    <el-button type="primary" class="btn" @click='wadd'>添加</el-button>
     <v-list :info='info' :list='list' @init='init' @meit='meit'></v-list>
     <v-add :info='info' @init='init' ref='add'></v-add>
  </div>
</template>

<script>
import vAdd from './components/add.vue'
import vList from './components/list.vue'
import {reqSecklist}  from '../../utils/http'
export default {
components: {
  vAdd,
  vList
},
data () {
  return {
    info:{
      isshow:false,
      iss:false
    },
    list:[],
  }
},
methods: {
  wadd(){
    this.info.isshow=true,
    this.info.iss=true
  },
  // 封装获取列表
  init(){
    reqSecklist().then(res=>{
      if(res.data.code==200){
        this.list=res.data.list
      }
    })
  },
  // 修改
  meit(id){
    this.info.isshow=true
    this.info.iss=false
    this.$refs.add.toOwn(id)
  }
},
mounted () {
  this.init()
}
}
</script>

<style scoped>
  .btn{
    margin: 20px 0;
  }
</style>