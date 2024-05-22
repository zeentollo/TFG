<template>
  <section id="principal">
    <img id="img_principal" src="@/assets/img/principal.gif">

    <p id="texto_titulo">HOLA {{ userName.toUpperCase() }}</p>
    <p id="texto_titulo">CAMBIA TU ESTILO, SÉ DIFERENTE</p>

    <section id="seleccionar">
      <div id="div_hombre">
        <picture id="img_hombre">
          <img src="@/assets/img/seleccionar-hombre.jpg">
        </picture>
        <p id="texto_hombre">HOMBRE</p>
      </div>

      <div id="div_mujer">
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

const store = useStore();

const userName = computed(() => store.getters.user_name)

</script>

<style lang="scss" scoped>
#principal {
  background-image: url("@/assets/img/fondo.jpg");
  background-size: cover;
  background-position: center;
}
#img_principal{
  width: 100%;
  height: 90vh;
}

#seleccionar{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#principal{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#texto_titulo{
  font-size: 48px;
  margin: 10px;
  letter-spacing: 6px;
}

#div_hombre, #div_mujer{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3%;
  margin-top: 0;
  picture{
    padding: 10px;
    img{
      width: 300px;
      height: 600px;
      padding: 20px;
      background-color: rgb(146, 146, 146);
    }
  }

  p{
    font-size: 34px;
    font-weight: bold;
  }
}
</style>