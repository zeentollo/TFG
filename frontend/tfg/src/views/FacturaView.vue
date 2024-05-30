<template>
    <section id="principal">
        <div id="div_titulo">
            <p id="titulo">FACTURA</p>
            <p id="fecha">{{ fechaActual }}</p>
        </div>
        <section id="info">
            <div id="div_principal">
                <p class="text_info">IMPORTE TOTAL: {{ total }} €</p>
                <div id="div_info">
                    <p class="text_div">COMERCIO: MATTEO RICCI</p>
                    <p class="text_div">TERMINAL: 5675788978-RJ</p>
                    <p class="text_div">Nº PEDIDO: {{ numeroPedido }}</p>
                    <p class="text_div">FECHA: {{ fechaActual }}</p>
                </div>
            </div>
        </section>
        <div v-for="(item, index) in productosEnCarrito" :key="index">
            <div class="div_prenda">
                <img class="prenda_img" :src="`http://localhost:3000/${item.producto.img}`" alt="Imagen Producto">
                <div class="div_texto">
                    <h3>{{ item.producto.name }}</h3>
                    <p>Precio: {{ item.producto.price }} €</p>
                    <p>Talla: {{ item.talla }}</p>
                </div>
            </div>
        </div>
        <button id="salir" @click="salir()">SALIR</button>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const fechaActual = ref('')
const numeroPedido = ref('')
const store = useStore();
const productosEnCarrito = computed(() => store.state.productosEnCarrito);
const router = useRouter();

const salir = () => {
  router.push("/seleccionar");
};

const total = computed(() => {
  return productosEnCarrito.value.reduce((sum, item) => sum + parseInt(item.producto.price), 0);
});

const ObtenerFechaActual = () => {
  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const ano = hoy.getFullYear()
  return `${dia}/${mes}/${ano}`
}

const ObtenerTiempoUnix = () => {
  return Math.floor(Date.now() / 1000).toString();
}

onMounted(() => {
  fechaActual.value = ObtenerFechaActual()
  numeroPedido.value = ObtenerTiempoUnix()
})
</script>

<style scoped>
#principal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#div_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
    gap: 140vh;
}

.div_prenda{
    margin: 40px;
}

.prenda_img{
    width: 45vh;
}

#titulo {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 4px;
}
#fecha {
    font-size: 20px;
    letter-spacing: 4px;
}
#info {
    background-color: #F5F5F5;
    font-size: 26px;
    padding: 30px;
    margin: 30px;
    display: flex;
    width: 80%;
}
#div_principal {
    align-items: center;
}
.text_info {
    font-weight: bold;
    margin: 40px;
    margin-left: 20px;
    letter-spacing: 4px;
}
.text_div {
    font-weight: 200;
    margin: 20px;
    letter-spacing: 4px;
    font-size: 16px;
}
#salir {
    width: 80vh;
    height: 60px;
    border: 1px solid;
    background-color: #5B5B5B;
    color: #FFFFFF;
    padding: 10px;
    letter-spacing: 4px;
    font-size: 32px;
    font-weight: bold;
    margin: 100px;
}
#salir:hover {
    cursor: pointer;
    color: rgb(255, 226, 226);
}

@media screen and (max-width: 768px) {
  #principal{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    text-align: center;
  }
  #div_titulo {
    margin: 50px;
    gap: 5vh;
  }
  #info{
    font-size: 22px;
    padding: 10px;
    margin: 30px;
    text-align: left;
  }
  .div_prenda{
    margin: 20px;
  }

  .prenda_img{
    width: 35vh;
    margin: 10px;
  }
  #salir {
    width: 35vh;
    height: 50px;
    padding: 5px;
    font-size: 22px;
    margin: 50px;
  }

}
</style>
