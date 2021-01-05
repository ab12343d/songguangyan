
export let state={
    // 列表数据初始化
    list:[],
    // 角色列表初始化
    listr:[],
    // 商品分类初始化
    cate:[],
    // 在仓库中存数据，会方便组件的取值，但是刷新就没了；本地存储刷新数据还会在。所以准备同步本地存储和状态层
    userInfo:sessionStorage.getItem('userInfo')?
    JSON.parse(sessionStorage.getItem('userInfo')):{}

}
export let mutations = {
    // 更换列表
    changeList(state,arr){
        state.list=arr
    },
    // 更新获取角色列表
    changeRole(state,arr){
        state.listr=arr
    },
    // 更新获取商品分类列表
    changCate(state,arr){
        state.cate=arr
    },
    // 存储数据
    changUserInfo(state,obj){
        state.userInfo=obj;
        // 同步到本地储存
        if(obj.username){
            sessionStorage.setItem('userInfo',JSON.stringify(obj))
        }else{
            sessionStorage.removeItem('userInfo')
        }
    }
}
export let getters={
    // 导出列表
     list(state){
         return state.list
     },
    //  导出角色列表
     listr(state){
         return state.listr
     },
    //  导出商品列表
    cate(state){
        return state.cate
    },
    userInfo(state){
        return state.userInfo
    }
}
