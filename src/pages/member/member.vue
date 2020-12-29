<template>
  <div>
    <v-list :info='info' :name='name' @obtain='obtain'></v-list>
    <v-add :info='info' ref='add' @init='init'></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import {resMemberlist} from '../../utils/http'
export default {
  components: {
    vAdd,
    vList
  },
  methods:{
    // 封装获取会员列表
    init(){
      resMemberlist().then(res=>{
        if(res.data.code==200)
         this.name=res.data.list
      })
    },
    obtain(uid){
      this.$refs.add.getOne(uid)
    }
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      name:[],
       info:{
          isshow:false
      }
    }
  }
  

};
</script>

<style scoped>

</style>