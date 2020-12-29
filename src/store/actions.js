import {
  reqMenulist,
  reqRolelist,
  resCatelist
} from '../utils/http'

// 获取列表
export let actions = {
  reqListAll(context) {
    reqMenulist().then(res => {
      if (res.data.code == 200) {
        context.commit('changeList', res.data.list)
      }
    })
  },
  // 获取角色列表
  reqRoleAll(context) {
    reqRolelist().then(res => {
      if (res.data.code == 200) {
        context.commit('changeRole', res.data.list)
      }
    })
  },

  // 获取商品分类列表
  reqCodeAll(context) {
    resCatelist({istree:true}).then(res => {
      if (res.data.code == 200) {
        context.commit('changCate', res.data.list)
      }
    })
  }
}
