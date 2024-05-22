<template>
  <div>
    <h1>Ropa para {{ genero }} - {{ categoria }}</h1>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const genero = computed(() => store.state.generoSeleccionado);
const categoria = computed(() => store.state.categoriaSeleccionada);
</script>

<style scoped>

</style>
