<template>
  <section id="principal">
    <img id="img_principal" src="@/assets/img/principal.gif">
    <div id="div_principal">
      <div id="div_arriba">
        <p id="eslogan">PARA COMENZAR, INICIA SESIÓN</p>
        <router-link to="/register" id="pregunta">¿No tienes cuenta? Registrate</router-link>
      </div>
      <form id="formulario" action="">
        <input class="inputs" type="text" name="" id="" placeholder="Indique su correo electronico">
        <input class="inputs" type="text" name="" id="" placeholder="Indique su contraseña">
        <button id="boton">ACCEDER</button>
      </form>
    </div>
  </section>
</template>

<script>

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



#div_arriba{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 100px;

  #eslogan{
    margin: 30px;
    letter-spacing: 4px;
    font-size: 40px;
  }

  #pregunta{
    text-decoration: none;
    color: #8F8F8F;
    font-weight: bold;
    letter-spacing: 4px;
    font-size: 32px;
  }
}

#formulario{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .inputs{
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

  #boton{
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
  #boton:hover{
    color: rgb(218, 218, 255);
  }
}
</style>