import { createStore } from 'vuex';

export default createStore({
  state: {
    generoSeleccionado: null,
    categoriaSeleccionada: null,
    nombreUsuario: ""
  },
  getters: {
    nombreUsuario: (state) => state.nombreUsuario
  },
  mutations: {
    esNombreUsuario: (state, nombreUsuario) => {
      state.nombreUsuario = nombreUsuario;
    },
    seleccionarGenero: (state, genero) => {
      state.generoSeleccionado = genero;
    },
    seleccionarCategoria(state, categoria) {
      state.categoriaSeleccionada = categoria;
    }
  },
  actions: {
    seleccionarGenero({ commit }, genero) {
      commit('seleccionarGenero', genero);
    },
    seleccionarCategoria({ commit }, categoria) {
      commit('seleccionarCategoria', categoria);
    }
  }
});
