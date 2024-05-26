<template>
  <section>
    <h1 id="titulo">MATTEO RICCI</h1>
    <router-view/>
    <footer id="footer">
      <ul id="lista_footer">
        <li>Términos y condiciones de compra</li>
        <li>Términos y condiciones de MATTEO RICCI</li>
        <li>Política de privacidad</li>
        <li>Política de cookies</li>
        <li>Configurar cookies</li>
      </ul>
    </footer>
  </section>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: 0;
  font-family: 'Montserrat', sans-serif;
}

#titulo{
  text-align: center;
  margin: 20px;
  font-weight: bold;
}

#footer{
  text-align: center;
  padding: 15px;
  background-color: #acacac;
  #lista_footer{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    li{
      margin: 0 40px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>

<script>

</script>