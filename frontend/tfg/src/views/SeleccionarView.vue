<template>
  <section id="principal">
    <img id="img_principal" src="@/assets/img/principal.gif">

    <p id="texto_titulo">HOLA {{ nombreUsuario.toUpperCase() }}</p>
    <p id="texto_titulo">CAMBIA TU ESTILO, SÉ DIFERENTE</p>

    <section id="seleccionar">
      <div id="div_hombre" @click="seleccionarGenero('hombre')">
        <picture id="img_hombre">
          <img src="@/assets/img/seleccionar-hombre.jpg">
        </picture>
        <p id="texto_hombre">HOMBRE</p>
      </div>

      <div id="div_mujer" @click="seleccionarGenero('mujer')">
        <picture id="img_mujer">
          <img src="@/assets/img/seleccionar-mujer.jpg">
        </picture>
        <p id="texto_mujer">MUJER</p>
      </div>
    </section>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const nombreUsuario = computed(() => store.getters.nombreUsuario);

const seleccionarGenero = (genero) => {
  store.commit("seleccionarGenero", genero);
  router.push({ name: genero.toLowerCase() });
};
</script>

<style lang="scss" scoped>
#principal {
  background-image: url("@/assets/img/fondo.jpg");
  background-size: cover;
  background-position: center;
}
#img_principal {
  width: 100%;
  height: 90vh;
}
#seleccionar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#principal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#texto_titulo {
  font-size: 48px;
  margin: 10px;
  letter-spacing: 6px;
  margin-top: 40px;
}
#div_hombre, #div_mujer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3%;
  margin-top: 0;
  picture {
    padding: 10px;
    img {
      width: 400px;
      height: 600px;
      padding: 20px;
      background-color: rgb(146, 146, 146);
      border: 1px solid black;
    }
    img:hover{
      cursor: pointer;
      border: 1px solid rgb(56, 86, 255);
    }
  }
  p {
    font-size: 34px;
    font-weight: bold;
  }
}
</style>
