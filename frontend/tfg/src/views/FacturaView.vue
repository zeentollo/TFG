<template>
    <section id="principal">
        <div id="div_titulo">
            <p id="titulo">FACTURA</p>
            <p id="fecha">{{ fechaActual }}</p>
        </div>
        <section id="info">
            <div id="div_principal">
                <p class="text_info">IMPORTE TOTAL: 000€</p>
                <div id="div_info">
                    <p class="text_div">COMERCIO: MATTEO RICCI</p>
                    <p class="text_div">TERMINAL: 5675788978-RJ</p>
                    <p class="text_div">Nº PEDIDO: 0000000</p>
                    <p class="text_div">FECHA: {{ fechaActual }}</p>
                </div>
            </div>
        </section>
        <button id="salir">SALIR</button>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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
#titulo {
    font-size: 40px;
    font-weight: bold;
    letter-spacing: 4px;
}
#fecha {
    font-size: 40px;
    letter-spacing: 4px;
}
#info {
    background-color: #F5F5F5;
    font-size: 36px;
    padding: 60px;
    margin: 50px;
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
    font-size: 26px;
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
</style>
