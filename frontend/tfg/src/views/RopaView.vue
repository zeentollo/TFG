<template>
  <section id="principal">
    <div id="img_principal" v-if="genero === 'Hombre'">
      <img id="img_principal" src="@/assets/img/hombre.jpg">
    </div>
    <div id="img_principal" v-else-if="genero === 'Mujer'">
      <img id="img_principal" src="@/assets/img/mujer.webp">
    </div>

    <div class="productos" v-if="productos && productos.length">
      <div v-for="(producto, index) in productos" :key="producto.id" class="producto">
        <img :src="`http://localhost:3000/${producto.img}`">
        <h3>{{ producto.name }}</h3>
        <p>{{ producto.price }} €</p>
        <div class="div_talla">
          <p class="text_talla">Elija su talla</p>
          <select v-model="tallas[index]" v-if="tallas && tallas.length">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <button class="boton_anadir" @click="anadirAlCarrito(producto, tallas[index])">Añadir al carrito</button>
      </div>
    </div>
    <div v-else>
      <p>No hay productos disponibles.</p>
    </div>

    <div class="carrito" v-if="productosEnCarrito && productosEnCarrito.length">
      <h2>Carrito de compras</h2>
      <div v-if="productosEnCarrito.length === 0">
        <p>¡Tu carrito está vacío!</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in productosEnCarrito" :key="index" class="item_carrito">
          <p>{{ item.producto.name }} - Talla: {{ item.talla }} - Precio: {{ item.producto.price }} €</p>
          <button @click="eliminarDelCarrito(index)">Eliminar</button>
        </div>
        <button @click="vaciarCarrito" class="vaciar_carrito">Vaciar carrito</button>
      </div>
    </div>
    <router-link to="/compra" >Compra</router-link>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const store = useStore();
const categoria = computed(() => store.state.categoriaSeleccionada);
const genero = computed(() => store.state.generoSeleccionado);
const productosEnCarrito = computed(() => store.state.productosEnCarrito);
const categoriaId = ref(0);
const productos = ref([]);
const tallas = ref([]);

const obtenerProductos = async () => {
  const responseCategoria = await axios.post("http://localhost:3000/subcategoria", { id: categoria.value }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (responseCategoria.status === 200) {
    categoriaId.value = responseCategoria.data;
  }
  const responseProductos = await axios.post("http://localhost:3000/productos", { subcategory: categoriaId.value }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (responseProductos.status === 200) {
    productos.value = responseProductos.data;
    tallas.value = Array(responseProductos.data.length).fill("");
  }
};

obtenerProductos();

const anadirAlCarrito = (producto, talla) => {
  if (!talla) {
    Swal.fire({
      icon: 'error',
      title: 'Por favor Seleccione una Talla.'
    });
    return;
  }
  store.commit('anadirProducto', { producto, talla });
  Swal.fire({
    icon: 'success',
    title: 'Añadido',
    text: 'Prenda añadido al carrito.',
  });
};

const eliminarDelCarrito = (index) => {
  store.commit('eliminarProducto', index);
};

const vaciarCarrito = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'VACIAR CARRITO',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      store.commit('vaciarCarrito');
      Swal.fire(
        '¡Ha quedado Limpio!',
        'Tu carrito ha sido vaciado correctamente.',
        'success'
      );
    }
  });
};
</script>

<style scoped>
#principal {
  background-color: #f0f0f0;
}

#img_principal {
  width: 100%;
  height: 90vh;
  margin-bottom: 30px;
}

.productos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.boton_anadir {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #66adff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}


.producto {
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.div_talla {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.text_talla {
  margin-right: 20px;
  font-size: 16px;
}

.producto img {
  max-width: 50vh;
  height: auto;
  border-radius: 5px;
}

.carrito {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item_carrito {
  margin-bottom: 10px;
}

.vaciar_carrito {
  margin-top: 10px;
}
</style>
