<template>
  <section id="principal">
    <img id="img_principal" src="@/assets/img/hombre.jpg">

    <p id="texto_titulo">NO CUALQUIER HOMBRE VISTE</p>
    <p id="texto_titulo">MATTEO RICCI</p>

    <section id="ropa">
      <div>
        <img src="@/assets/img/seleccionar-trajes.png">
        <p>TRAJES</p>
      </div>

      <div>
        <img src="@/assets/img/seleccionar-camisas.png">
        <p>CAMISAS</p>
      </div>

      <div>
        <img src="@/assets/img/seleccionar-pantalones.png">
        <p>PANTALONES</p>
      </div>
    </section>
  </section>

</template>

<script>

</script>

<style lang="scss" scoped>
#principal {
  background-image: url("@/assets/img/fondo.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#img_principal{
  width: 100%;
  height: 90vh;
}

#texto_titulo{
  font-size: 48px;
  margin: 10px;
  letter-spacing: 6px;
}

#ropa{
  display: flex;
  margin: 100px;
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 40px;
    

    img{
      width: 500px;
      height: 400px;
      margin: 20px;
    }

    p{
      font-size: 32px;
      letter-spacing: 4px;
    }
  }
}

</style>