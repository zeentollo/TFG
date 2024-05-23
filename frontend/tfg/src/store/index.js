import { createStore } from 'vuex';

export default createStore({
  state: {
    generoSeleccionado: null,
    categoriaSeleccionada: null,
    nombreUsuario: "",
    productosId: []
  },
  getters: {
    nombreUsuario: (state) => state.nombreUsuario,
    listaProductosId: (state) => state.productosId
  },
  mutations: {
    esNombreUsuario: (state, nombreUsuario) => {
      state.nombreUsuario = nombreUsuario;
    },
    seleccionarGenero: (state, genero) => {
      state.generoSeleccionado = genero;
    },
    seleccionarCategoria: (state, categoria) => {
      state.categoriaSeleccionada = categoria;
    },
    anadirProducto: (state, productosId) => {
      state.productosId.push(productosId);
    },
    eliminarProducto: (state, producto) => {
      const posicion = state.productosId.indexOf(producto);
      state.productosId.splice(posicion, 1);
    },
    vaciarCarrito: (state) => {
      state.productosId = [];
    }
  },
  actions: {
    
  }
});
