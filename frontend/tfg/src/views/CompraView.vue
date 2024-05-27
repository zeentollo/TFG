<template>
  <section id="principal">
    <div id="div_vacio" v-if="productosEnCarrito.length === 0">
      <p id="titulo">¡Tu carrito está vacío!</p>
    </div>
    <div v-else>
      <h1 id="titulo">TU COMPRA EN MATTEO RICCI</h1>
      <div id="div_atras">
        <router-link to="/ropa" id="atras">Atrás</router-link>
      </div>

      <div v-for="(item, index) in productosEnCarrito" :key="index" class="producto_en_carrito">
        <img :src="`http://localhost:3000/${item.producto.img}`" alt="Imagen Producto">
        <div class="div_texto">
          <h3>{{ item.producto.name }}</h3>
          <p>Precio: {{ item.producto.price }} €</p>
          <p>Talla: {{ item.talla }}</p>
          <button class="boton_eliminar" @click="confirmarEliminar(index)">Eliminar</button>
        </div>
      </div>
      <div id="div_confirmar">
        <button id="boton_confirmar" @click="confirmarCompra()">CONFIRMAR COMPRA</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const store = useStore();
const productosEnCarrito = computed(() => store.state.productosEnCarrito);
const router = useRouter();

const confirmarCompra = () => {
  router.push("/pago");
};

const eliminarDelCarrito = (index) => {
  store.commit('eliminarProducto', index);
};

const confirmarEliminar = (index) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás volver atrás!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminarlo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarDelCarrito(index);
      Swal.fire(
        '¡Eliminado!',
        'La prenda ha sido eliminada.',
        'success'
      );
    }
  });
};
</script>

<style scoped>
#principal {
  background-image: url("@/assets/img/fondo.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
}

#titulo {
  font-size: 48px;
  margin: 40px;
}

#div_atras{
  align-items: center;
  text-align: center;
}

#atras{
  font-size: 18px;
  text-decoration: none;
  color: black;
}

#atras:hover{
  color: rgb(111, 0, 0);
}

#div_vacio{
  height: 85vh;
}

.producto_en_carrito {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.producto_en_carrito img {
  max-width: 40vh;
  height: auto;
  border-radius: 5px;
  margin: 20px;
}

.div_texto {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.boton_eliminar {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6666;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

#div_confirmar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 10px;
  text-align: center;
}

#boton_confirmar {
  width: 80vh;
  height: 60px;
  background-color: #5B5B5B;
  color: #FFFFFF;
  padding: 10px;
  letter-spacing: 4px;
  font-size: 32px;
  font-weight: bold;
  margin: 30px;
}

#boton_confirmar:hover {
  color: rgb(216, 255, 216);
  cursor: pointer;
}
</style>
