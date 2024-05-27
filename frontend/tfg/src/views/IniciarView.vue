<template>
  <section id="principal">
    <img id="img_principal" src="@/assets/img/principal.gif">
    <div id="div_principal">
      <div id="div_arriba">
        <p id="eslogan">PARA COMENZAR, INICIA SESIÓN</p>
        <router-link to="/register" id="pregunta">¿No tienes cuenta? Regístrate</router-link>
      </div>
      <form id="formulario" @submit.prevent="login">
        <input class="inputs" v-model="email" type="email" placeholder="Indique su correo electrónico" required>
        <input class="inputs" v-model="pass" type="password" placeholder="Indique su contraseña" required>
        <button id="boton" type="submit">ACCEDER</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'

const store = useStore()
const email = ref("")
const pass = ref("")
const router = useRouter()

const login = async () => {
  const data = {
    email: email.value,
    pass: pass.value,
  }

  try {
    const response = await axios.post("http://localhost:3000/login", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response.data)
    if (response.status == 200) {
      store.commit("esNombreUsuario", response.data[0].name)
      store.commit("esNombreId", response.data[0].id)
      Swal.fire({
        position: "top",
        icon: "success",
        title: "¡Has iniciado sesión correctamente!",
        showConfirmButton: false,
        timer: 1500
      });
      router.push("/seleccionar")
    }
  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta del servidor:', error.response.data)
      Swal.fire(
        '¡Error!',
        'Error con el usuario, revisa los campos introducidos.',
        'error'
      );
    } else if (error.request) {
      console.error('Error de solicitud:', error.request)
      Swal.fire(
        '¡Error!',
        'Error con el usuario, revisa los campos introducidos.',
        'error'
      );
    } else {
      console.error('Error:', error.message)
      Swal.fire(
        '¡Error!',
        'Error con el usuario, revisa los campos introducidos.',
        'error'
      );
    }
    console.error('Error de configuración:', error.config)
    Swal.fire(
        '¡Error!',
        'Error con el usuario, revisa los campos introducidos.',
        'error'
      );
  }
}
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

#div_principal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#div_arriba {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 100px;

  #eslogan {
    margin: 30px;
    letter-spacing: 4px;
    font-size: 40px;
  }

  #pregunta {
    text-decoration: none;
    color: #8F8F8F;
    font-weight: bold;
    letter-spacing: 4px;
    font-size: 32px;
  }
}

#formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .inputs {
    width: 100vh;
    height: 50px;
    border-radius: 10px;
    border: 1px solid;
    background-color: #F2F2F2;
    padding: 10px;
    margin: 10px;
    letter-spacing: 4px;
    font-size: 22px;
    margin: 40px;
  }

  #boton {
    margin: 100px;
    cursor: pointer;
    background-color: #454545;
    color: white;
    font-weight: bold;
    letter-spacing: 4px;
    font-size: 32px;
    padding: 10px;
    letter-spacing: 4px;
  }

  #boton:hover {
    color: rgb(218, 218, 255);
  }
}
</style>
