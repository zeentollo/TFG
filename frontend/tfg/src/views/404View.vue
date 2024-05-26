<template>
    <section id="principal">
        <h1 id="titulo">Ha ocurrido un error..</h1>
        <img src="@/assets/img/404.gif" alt="">
        <button id="salir" @click="salir()">Salir</button>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const salir = () => {
  router.push("/");
};

</script>

<style scoped>
#principal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#titulo{
    font-size: 80px;
    letter-spacing: 10px;
    color: rgb(35, 112, 255);
    margin: 20px;
}

#salir{
    margin: 33px;
    padding: 10px 20px;
    background-color: #ff6666;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

</style>
