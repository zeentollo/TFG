<template>
  <section id="principal">
    <img id="img_principal" src="@/assets/img/principal.gif" alt="Principal Image">
    <div id="div_principal">
      <div id="div_arriba">
        <p id="eslogan">¡HOLA, ES UN GUSTO TENERTE POR AQUÍ!</p>
        <router-link to="/" id="pregunta">¿Ya tienes cuenta? Iniciar Sesión</router-link>
      </div>
      <form id="formulario" @submit.prevent="validate">
        <input class="inputs" type="text" v-model="name" id="input_name" placeholder="Indique su nombre de usuario" required>
        <div id="div_date">
          <p id="texto">Indique su fecha de nacimiento</p>
          <input class="inputs" type="date" v-model="date" id="input_date" required>
        </div>
        <input class="inputs" type="email" v-model="email" id="input_email" placeholder="Indique su correo electrónico" required>
        <input class="inputs" type="password" v-model="pass" id="input_pass" placeholder="Indique su contraseña" required>
        <button id="boton">REGISTRATE</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const name = ref("")
const date = ref("")
const email = ref("")
const pass = ref("")
const router = useRouter()

const register = async () => {
  const data = {
    name: name.value,
    date: date.value,
    email: email.value,
    pass: pass.value,
  }

  try {
    const response = await axios.post("http://localhost:3000/register", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    if (response.status == 200) {
      Swal.fire(
        '¡Bienvenido!',
        'Usuario creado correctamente.',
        'success'
      );
      router.push("/")
    }
  } catch (error) {
    if (error.response) {
      console.error('Error de respuesta del servidor:', error.response.data)
      Swal.fire(
        '¡Error!',
        'Ese usuario ya existe, revisa los campos introducidos.',
        'error'
      );
    } else if (error.request) {
      console.error('Error de solicitud:', error.request)
      Swal.fire(
        '¡Error!',
        'Ha ocurrido un error, revisa los campos introducidos.',
        'error'
      );
    } else {
      console.error('Error:', error.message)
      Swal.fire(
        '¡Error!',
        'Ha ocurrido un error, revisa los campos introducidos.',
        'error'
      );
    }
    console.error('Error de configuración:', error.config)
    Swal.fire(
        '¡Error!',
        'Ese usuario ya existe, revisa los campos introducidos.',
        'error'
      );
  }
}

const validate = () => {
  const nameSimbolos = /^[a-zA-Z0-9]+$/;
  const emailSimbolos = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passSimbolos = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameSimbolos.test(name.value)) {
    Swal.fire(
        '¡Error!',
        'El nombre de usuario solo puede contener letras y números.',
        'error'
      );
    return;
  }

  if (!emailSimbolos.test(email.value)) {
    Swal.fire(
        '¡Error!',
        'El correo electrónico no es válido.',
        'error'
      );
    return;
  }

  if (!passSimbolos.test(pass.value)) {
    Swal.fire(
        '¡Error!',
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.',
        'error'
      );
    return;
  }

  const fechaNacimiento = new Date(date.value);
  const minFecha = new Date('1900-01-01');
  const maxFecha = new Date();

  if (fechaNacimiento < minFecha || fechaNacimiento > maxFecha) {
    Swal.fire(
        '¡Error!',
        'La fecha de nacimiento no es correcta.',
        'error'
      );
    return;
  }

  register();
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
}

#eslogan {
  margin: 40px;
  letter-spacing: 4px;
  font-size: 40px;
}

#pregunta {
  text-decoration: none;
  color: #8f8f8f;
  font-weight: bold;
  letter-spacing: 4px;
  font-size: 32px;
}

#formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#div_date {
  margin: 10px 0;

  #texto {
    text-align: left;
    margin-left: 20px;
    font-size: 22px;
    letter-spacing: 4px;
  }

  #input_date {
    margin-top: 0;
  }
}

.inputs {
  width: 100vh;
  height: 50px;
  border-radius: 10px;
  border: 1px solid;
  background-color: #f2f2f2;
  padding: 10px;
  margin: 10px 0;
  letter-spacing: 4px;
  font-size: 22px;
}

#boton {
  margin: 80px;
  cursor: pointer;
  background-color: #454545;
  color: white;
  font-weight: bold;
  letter-spacing: 4px;
  font-size: 32px;
  padding: 10px;
  margin-bottom: 80px;
}

#boton:hover {
  color: rgb(218, 218, 255);
}

@media (max-width: 768px) {
  #img_principal{
    height: 50vh;
  }
  #div_arriba {
    margin: 20px;

    #eslogan {
      margin: 20px;
      font-size: 24px;
    }

    #pregunta {
      font-size: 18px;
    }
  }

  #formulario {
    .inputs {
      width: 80vw;
      font-size: 16px;
      margin: 10px;
    }

    #boton {
      margin: 20px;
      font-size: 18px;
      padding: 10px;
    }
  }

  #div_date {
    #texto {
      margin-left: 14px;
      margin-bottom: 5px;
      font-size: 14px;
    }

    #input_date {
      width: 80vw;
      font-size: 16px;
    }
  }
}
</style>
