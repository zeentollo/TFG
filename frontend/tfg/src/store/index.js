import { createStore } from 'vuex'

export default createStore({
  state: {
    user_name: ""
  },
  getters: {
    user_name: (state) => state.user_name
  },
  mutations: {
    set_user_name: (state, user_name) => {
      state.user_name = user_name
    }
  }
})
