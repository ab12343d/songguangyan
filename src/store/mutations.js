
export let state={
    // 列表数据初始化
    list:[],
    // 角色列表初始化
    listr:[],
    // 商品分类初始化
    cate:[]
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
    }
}
