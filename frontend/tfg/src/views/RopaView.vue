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
        <div class="div_talla" v-if="mostrarTallas">
          <p class="text_talla">Elija su talla</p>
          <select v-model="tallas[index]">
            <option v-for="talla in opcionesTalla" :key="talla" :value="talla">{{ talla }}</option>
          </select>
        </div>
        <button class="boton_anadir" @click="anadirAlCarrito(producto, tallas[index])">Añadir al carrito</button>
      </div>
    </div>
    <div v-else>
      <p>No hay productos disponibles.</p>
    </div>

    <section id="section_carrito">
      <transition name="fade-slide">
        <div id="carrito" v-if="productosEnCarrito && productosEnCarrito.length">
          <h2 id="titulo_carrito">TU CESTA</h2>
          <div v-if="productosEnCarrito.length === 0" class="producto_carrito">
            <p>¡Tu cesta está vacío!</p>
          </div>
          <div v-else>
            <div v-for="(item, index) in productosEnCarrito" :key="index" class="producto_carrito">
              <p class="producto_nombre">{{ item.producto.name }}</p>
              <p class="producto_precio">{{ item.producto.price }} €</p>
              <p class="producto_talla">Talla: {{ item.talla }}</p>
              <button class="producto_eliminar" @click="eliminarDelCarrito(index)">Eliminar</button>
            </div>
            <button @click="comprar" id="comprar">COMPRAR</button>
            <div id="div_vaciar">
              <button @click="vaciarCarrito" id="vaciar_carrito">VACIAR CESTA</button>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
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

obtenerProductos()

const anadirAlCarrito = (producto, talla) => {
  if (categoria.value !== 'bolsos' && !talla) {
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

const mostrarTallas = computed(() => categoria.value !== 'bolsos');

const opcionesTalla = computed(() => {
  if (categoria.value === 'zapatos') {
    return ['38', '39', '40', '41', '42', '43'];
  } else if (categoria.value === 'bolsos') {
    return [];
  } else {
    return ['S', 'M', 'L', 'XL'];
  }
});

const comprar = () => {
  router.push("/compra")
}
</script>

<style scoped>
@keyframes slide-fade-in {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.fade-slide-enter-active {
  animation: slide-fade-in 0.5s ease-out forwards;
}

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
  max-width: 45vh;
  height: auto;
  border-radius: 5px;
}

#section_carrito {
  position: fixed;
  top: 10vh;
  right: -5px;
  z-index: 1000;
}

#carrito {
  position: relative;
  width: 25vh;
  padding: 30px;
  border: 2px solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow-x: auto;
  max-height: 70vh;
}



#titulo_carrito {
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
}

.producto_carrito {
  margin-bottom: 10px;
}

.producto_nombre {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
}

.producto_precio {
  margin-bottom: 10px;
}

.producto_talla {
  margin-bottom: 10px;
}

#comprar {
  background-color: #2E2E2E;
  width: 100%;
  padding: 5px;
  color: white;
  letter-spacing: 3px;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  margin-bottom: 30px;
}

#comprar:hover{
  cursor: pointer;
  color: rgb(210, 255, 218);
}

.producto_eliminar {
  background-color: #2E2E2E;
  width: 100%;
  padding: 5px;
  color: #FFB1B1;
  font-weight: bold;
  margin: 10px;
  margin-left: 0;
  margin-bottom: 40px;
}

.producto_eliminar:hover{
  color: #ff6666;
  cursor: pointer;
}

#div_vaciar {
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
}

#vaciar_carrito {
  margin-top: 10px;
  border: 0;
  color: #AEAEAE;
  background-color: white;
  font-size: 18px;
}

#vaciar_carrito:hover{
  cursor: pointer;
  color: #ff6161 ;
}
</style>
