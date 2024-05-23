import { createStore } from 'vuex';

export default createStore({
  state: {
    generoSeleccionado: null,
    categoriaSeleccionada: null,
    nombreUsuario: "",
    productosId: [],
    productosEnCarrito: []
  },
  getters: {
    nombreUsuario: (state) => state.nombreUsuario,
    listaProductosId: (state) => state.productosId,
    listaProductosEnCarrito: (state) => state.productosEnCarrito
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
    anadirProducto: (state, { producto, talla }) => {
      state.productosEnCarrito.push({ producto, talla });
    },
    eliminarProducto: (state, index) => {
      state.productosEnCarrito.splice(index, 1);
    },
    vaciarCarrito: (state) => {
      state.productosEnCarrito = [];
    }
  },
  actions: {
    
  }
});
