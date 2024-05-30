import { createStore } from 'vuex';

export default createStore({
  state: {
    generoSeleccionado: null,
    categoriaSeleccionada: null,
    nombreUsuario: "",
    productosId: [],
    productosEnCarrito: [],
    nombreId: "",
    factura: "",
    token: ""
  },
  getters: {
    nombreUsuario: (state) => state.nombreUsuario,
    listaProductosId: (state) => state.productosId,
    listaProductosEnCarrito: (state) => state.productosEnCarrito,
    nombreId: (state) => state.nombreId,
    factura: (state) => state.factura,
    token: (state) => state.token
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
    },
    esNombreId: (state, nombreId) => {
      state.nombreId = nombreId;
    },
    esFactura: (state, id) => {
      state.factura = id
    }
  },
  actions: {
    async loadUser({ commit }) {

      try {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
          commit('esNombreUsuario', usuarioGuardado);
        }

      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    }}
});
