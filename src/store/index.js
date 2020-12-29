import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {actions} from './actions'
import {state,getters,mutations} from './mutations'
import goods from './modules/goods'
import specs from './modules/specs'

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules:{
        goods,
        specs
    }

})