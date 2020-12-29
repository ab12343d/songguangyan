import {
  resGoodslist
} from '../../utils/http'
let state = {
  list: []
}
let mutations = {
  changeGppds(state, arr) {
    state.list = arr
  }
}
let getters = {
  list(state) {
    return state.list
  }
}
let actions = {
  reqGoods(context) {
    resGoodslist().then(res => {
      if (res.data.code == 200) {
        context.commit('changeGppds', res.data.list)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间
  namespaced: true
}
