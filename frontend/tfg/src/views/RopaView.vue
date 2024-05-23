<template>
  <section id="principal">
    <h1>Ropa para {{ genero }} - {{ categoria }}</h1>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const genero = computed(() => store.state.generoSeleccionado);
const categoria = computed(() => store.state.categoriaSeleccionada);
</script>

<style scoped>
#principal {
  background-image: url("@/assets/img/fondo.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
