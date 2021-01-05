import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import store from '../store'
import router from '../router'
import {
  erroralert
} from './alert'
// 开发环境使用8080
let baseUrl = '/api'
Vue.prototype.$pre = 'http://localhost:3000'

// 生产环境使用 打包
// let baseUrl = ''
// Vue.prototype.$pre=''

//请求拦截:设置请求头
axios.interceptors.request.use(config=>{
  if(config.url!==baseUrl+"/api/userlogin"){
      config.headers.authorization=store.state.userInfo.token
  }
  return config
})

// 响应拦截
axios.interceptors.response.use(res => {
  // console.group('本次请求地址是:'+res.config.url)
  // console.log(res)
  // console.groupEnd()
  if (res.data.code != 200) {
    erroralert(res.data.msg)
  }
  if (!res.data.list) {
    res.data.list = []
  }
  // 掉线处理
  if(res.data.msg=='登录已过期或访问权限受限'){
    // 清除用户登录的信息，userInfo
    store.dispatch('changeUser',{})
    // 跳到登录页
     router.push('/login')
  }
  return res
})


// post 带有文件，参数转换
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

// 菜单添加
export const reqMenuAdd = (user => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(user)
  })
})
// 菜单列表
export const reqMenulist = () => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params: {
      istree: true
    }
  })
}
// 删除菜单
export const reqMenudelete = (id) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: qs.stringify(id)
  })
}
// 菜单获取一条
export const reqMenuinfo = (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'get',
    params: {
      id
    }
  })
}
// 菜单修改
export const reqMenuedit = (user) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(user)
  })
}
// 角色添加
export const reqRoleadd = (user) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data: qs.stringify(user)
  })
}
// 获取角色列表
export const reqRolelist = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'get'
  })
}
// 角色删除
export const reqRoledelete = (id) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'post',
    data: qs.stringify(id)
  })
}
// 获取一条角色数据
export const reqRoleinfo = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params: {
      id
    }
  })
}
// 修改角色数据
export const reqRoleedit = (user) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(user)
  })
}
// 管理员添加
export const reqUseradd = (user) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method: 'post',
    data: qs.stringify(user)
  })
}
// 管理员总数（用于计算分页)
export const reqUsercount = () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: 'get',
  })
}
// 管理员列表（分页）
export const reqUserlist = (user) => {
  return axios({
    url: baseUrl + '/api/userlist',
    method: 'get',
    params: user
  })
}
// 管理员删除
export const reqUserdelete = (uid) => {
  return axios({
    url: baseUrl + '/api/userdelete',
    method: 'post',
    data: qs.stringify(uid)
  })
}
// 管理员获取（一条）
export const reqUserinfo = (uid) => {
  return axios({
    url: baseUrl + '/api/userinfo',
    method: 'get',
    params: uid
  })
}
// 管理员修改
export const reqUseredit = (user) => {
  return axios({
    url: baseUrl + '/api/useredit',
    method: 'post',
    data:qs.stringify(user) 
  })
}
//管理员登录
export const reqUserlogin = (user) => {
  return axios({
    url: baseUrl + '/api/userlogin',
    method: 'post',
    data:qs.stringify(user)
  })
}
// 商品分类添加
export const resCateadd=(user)=>{
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:dataToFormData(user)
    })
}
// 获取商品分类列表
export const resCatelist=(user)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:user
    })
}
// 商品分类删除
export const resCatedelete=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify(id)
    })
}
// 商品分类获取（一条）
export const resCateinfo=(id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:id
    })
}
// 商品分类修改
export const resCateedit=(user)=>{
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:dataToFormData(user)
    })
}
// 轮播图添加
export const resBanneradd=(user)=>{
  return axios({
    url:baseUrl+'/api/banneradd',
    method:'post',
    data:dataToFormData(user)
  })
}
// 获取轮播图列表
export const resBannerlist=()=>{
  return axios({
    url:baseUrl+'/api/bannerlist',
    method:'get'
  })
}
// 轮播图获取（一条）
export const resBannerinfo=(id)=>{
  return axios({
    url:baseUrl+'/api/bannerinfo',
    method:'get',
    params:id
  })
}
// 修改轮播图
export const resBannerrdit=(user)=>{
  return axios({
    url:baseUrl+'/api/banneredit',
    method:'post',
    data:dataToFormData(user)
  })
}
// 轮播图删除
export const resBannerdelete=(id)=>{
  return axios({
    url:baseUrl+'/api/bannerdelete',
    method:'post',
    data:id
  })
}
// 获取会员列表
export const resMemberlist=()=>{
  return axios({
    url:baseUrl+'/api/memberlist',
    method:'get'
  })
}
// 获取会员（一条）
export const resMemberinfo=(uid)=>{
  return axios({
    url:baseUrl+'/api/memberinfo',
    method:'get',
    params:uid
  })
}
// 会员修改
export const resMemberdit=(user)=>{
    return axios({
      url:baseUrl+'/api/memberedit',
      method:'post',
      data:qs.stringify(user)
    })
}
// 商品规格添加
export const resSpecsadd=(user)=>{
  return axios({
    url:baseUrl+'/api/specsadd',
    method:'post',
    data:qs.stringify(user)
  })
}
// 商品规格总数（用于计算分页）
export const resSpecscpunt=()=>{
  return axios({
    url:baseUrl+'/api/specscount',
    method:'get'
  })
}
// 商品规格列表（分页）
export const resSpecslist=(user)=>{
  return axios({
    url:baseUrl+'/api/specslist',
    method:'get',
    params:user
  })
}
// 商品规格删除
export const resSpecsdelete=(id)=>{
  return axios({
    url:baseUrl+'/api/specsdelete',
    method:'post',
    data:qs.stringify(id)
  })
}
// .商品规格获取（一条）
export const resSpecsinfo=(id)=>{
  return axios({
    url:baseUrl+'/api/specsinfo',
    method:'get',
    params:id
  })
}
// .商品规格修改
export const resSpecsedit=(user)=>{
  return axios({
    url:baseUrl+'/api/specsedit',
    method:'post',
    data:qs.stringify(user)
  })
}

// 商品管理
// 商品添加
export const resGoodsadd=(user)=>{
  return axios({
    url:baseUrl+'/api/goodsadd',
    method:'post',
    data:dataToFormData(user)
  })
}
// 商品总数（用于计算分页）
export const resGoodscount=()=>{
  return axios({
    url:baseUrl+'/api/goodscount',
    method:'get'
  })
}
// 商品列表（分页）
export const resGoodslist=(user)=>{
  return axios({
    url:baseUrl+'/api/goodslist',
    menubar:'get',
    params:user
  })
}
// 商品删除
export const reqGoodsdelete=(id)=>{
  return axios({
    url:baseUrl+'/api/goodsdelete',
    method:'post',
    data:id
  })
}
// 商品修改
export const reqGoodsedit=(user)=>{
  return axios({
    url:baseUrl+'/api/goodsedit',
    method:'post',
    data:dataToFormData(user)
  })
}
// 商品获取（一条）
export const reqGoodsinfo=(id)=>{
  return axios({
    url:baseUrl+'/api/goodsinfo',
    method:'get',
    params:id
  })
}
// 限时秒杀添加
export const reqSeckadd=(user)=>{
  return axios({
    url:baseUrl+'/api/seckadd',
    method:'post',
    data:qs.stringify(user)
  })
}
// 获取限时秒杀列表
export const reqSecklist=()=>{
  return axios({
    url:baseUrl+'/api/secklist',
    method:'get'
  })
}
// 限时秒杀删除
export const reqSeckdelete=(id)=>{
  return axios({
    url:baseUrl+'/api/seckdelete',
    method:'post',
    data:qs.stringify(id)
  })
}
// 获取消失秒杀（一条）
export const reqSeckinfo=(id)=>{
  return axios({
    url:baseUrl+'/api/seckinfo',
    method:'get',
    params:id
  })
}
// 限时秒杀修改
export const reqSeckedit=(user)=>{
  return axios({
    url:baseUrl+'/api/seckedit',
    method:'post',
     data:qs.stringify(user)
  })
}