<template>
    <section id="principal">
        <section id="info">
            <p class="text_info">IMPORTE</p>
            <p class="text_info">{{ total }} €</p>

            <div id="div_info">
                <p class="text_div">COMERCIO: MATTEO RICCI</p>
                <p class="text_div">TERMINAL: 5675788978-RJ</p>
                <p class="text_div">FECHA: {{ fechaActual }}</p>
            </div>
        </section>

        <section id="inputs">
            <p id="texto">PAGO CON TARJETA</p>
            <div id="div_inputs">
                <i id="iconos" class="fa-regular fa-credit-card"></i><p>Nº DE TARJETA</p>
            </div>
            <input v-model="numeroTarjeta" type="text" name="" id="input" placeholder="0000 0000 0000 0000" maxlength="16"><br>
            
            <div id="div_inputs">
                <i id="iconos" class="fa-regular fa-calendar"></i><p>FECHA DE CADUCIDAD</p>
            </div>
            <input v-model="fechaCaducidad" type="date" name="" id="input"><br>

            <div id="div_inputs">
                <i id="iconos" class="fa-solid fa-credit-card"></i><p>COD. DE SEGURIDAD</p>
            </div>
            <input v-model="codigoSeguridad" type="text" name="" id="input" placeholder="000" maxlength="3">

            <div id="div_botones">
                <button @click="validarPago" class="botones" id="pagar">PAGAR</button>
                <button @click="cancelar" class="botones" id="cancelar">CANCELAR</button>
            </div>

        </section>

    </section>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const numeroTarjeta = ref('')
const fechaCaducidad = ref('')
const codigoSeguridad = ref('')

const store =  useStore()
const router = useRouter()

const productosEnCarrito = computed(() => store.state.productosEnCarrito);

const total = computed(() => {
  return productosEnCarrito.value.reduce((sum, item) => sum + parseInt(item.producto.price), 0);
});

const fechaActual = ref('')
const ObtenerFechaActual = () => {
  const hoy = new Date()
  const dia = String(hoy.getDate()).padStart(2, '0')
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const ano = hoy.getFullYear()
  return `${dia}/${mes}/${ano}`
}

onMounted(() => {
  fechaActual.value = ObtenerFechaActual()
})

const validarPago = async () => {
  if (!numeroTarjeta.value || !fechaCaducidad.value || !codigoSeguridad.value) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacíos',
      text: 'Por favor, completa todos los campos.'
    });
    return;
  }

  const tarjetaValida = /^\d{16}$/;
  if (!tarjetaValida.test(numeroTarjeta.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Datos erróneos',
      text: 'El número de tarjeta debe contener 16 dígitos numéricos'
    });
    return;
  }

  if (new Date(fechaCaducidad.value) <= new Date()) {
    Swal.fire({
      icon: 'error',
      title: 'Datos erróneos',
      text: 'La fecha de caducidad debe ser posterior a la actual'
    });
    return;
  }

  const codigoValido = /^\d{3}$/;
  if (!codigoValido.test(codigoSeguridad.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Datos erróneos',
      text: 'El código de seguridad debe contener 3 dígitos numéricos'
    });
    return;
  }

  const user = computed(() => store.getters.nombreId)
  const productosEnCarrito = computed(() =>  store.getters.listaProductosEnCarrito)
  const total = computed(() => {
    return productosEnCarrito.value.reduce((sum, item) => sum + parseInt(item.producto.price), 0);
  });
  const productosId = []
  productosEnCarrito.value.forEach(producto => {
    productosId.push(producto.producto.id)
  });

  const crearFactura = await axios.post("http://localhost:3000/factura", {user: user.value, total: total.value, productos: productosId}, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  store.commit("esFactura", crearFactura.data)
  Swal.fire({
    icon: 'success',
    title: 'Pago correcto',
    text: 'Se ha procesado tu pago correctamente'
  });
  router.push("/factura")
}


const cancelar = () => {
    router.push("/compra")
}
</script>

<style scoped>
#principal {
    background-image: url("@/assets/img/fondo.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

#info{
    background-color: #F5F5F5;
    font-size: 36px;
    padding: 40px;
    padding-bottom: 140px;
    margin: 50px;
    margin-top: 120px;
}
.text_info{
    font-weight: bold;
    margin: 40px;
    margin-left: 20px;
}

.text_div{
    font-weight: 200;
    margin: 20px;
}

#inputs{
    font-size: 30px;
}

#texto{
    margin-bottom: 40px;
    font-size: 48px;
    margin-top: 100px;
}

#div_inputs{
    display: flex;
}

#input{
    margin-bottom: 60px;
    margin-top: 30px;
    width: 100vh;
    height: 40px;
    border: 1px solid;
    background-color: #F2F2F2;
    padding: 10px;
    letter-spacing: 6px;
    font-size: 32px;
}

#iconos{
    margin-right: 20px;
}

#div_botones{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 400px;
    margin-bottom: 20px;
}

.botones{
    width: 30vh;
    height: 60px;
    border: 1px solid;
    background-color: #F2F2F2;
    padding: 10px;
    letter-spacing: 4px;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 50px;
}

#pagar{
    background-color: #39B8FF;
    color: #FFFFFF;
}

#pagar:hover{
    background-color: #39B8FF;
    color: #92ffa8;
    cursor: pointer;
}

#cancelar{
    background-color: #636363;
    color: #FFFFFF;
}

#cancelar:hover{
    color: #ff7171;
    cursor: pointer;
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
  #info{
    font-size: 22px;
    padding: 10px;
    margin: 30px;
  }
  #titulo {
    font-size: 26px;
    text-align: center;
  }
  .producto_en_carrito{
    width: 90%;
    height: auto;
  }
  .producto_en_carrito img {
    width: 85%;
    height: 50vh;
  }
  #boton_confirmar {
    width: 30vh;
    height: 80px;
    font-size: 22px;
  }

  #texto{
      margin-bottom: 20px;
      font-size: 32px;
      margin-top: 40px;
  }

  #div_inputs{
      display: flex;
      font-size: 24px;
  }

  #input{
      margin-bottom: 30px;
      margin-top: 10px;
      width: 40vh;
      height: 30px;
      border: 1px solid;
      background-color: #F2F2F2;
      padding: 10px;
      letter-spacing: 6px;
      font-size: 22px;
  }

  #iconos{
      margin-right: 20px;
  }

  #div_botones{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      margin-bottom: 20px;
  }

  .botones{
      width: 20vh;
      height: 50px;
      border: 1px solid;
      background-color: #F2F2F2;
      letter-spacing: 4px;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 50px;
      padding: 3px;
  }
}
</style>
