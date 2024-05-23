<template>
    <section id="principal">
        <section id="info">
            <p class="text_info">IMPORTE</p>
            <p class="text_info">000 €</p>

            <div id="div_info">
                <p class="text_div">COMERCIO: MATTEO RICCI</p>
                <p class="text_div">TERMINAL: 5675788978-RJ</p>
                <p class="text_div">N* PEDIDO: 0000000</p>
                <p class="text_div">FECHA: 01/01/2000</p>
            </div>
        </section>

        <section id="inputs">
            <p id="texto">PAGAR CON TARJETA</p>
            <div id="div_inputs">
                <i id="iconos" class="fa-regular fa-credit-card"></i><p>Nº DE TARJETA</p>
            </div>
            <input type="text" name="" id="input" placeholder="0000 0000 0000 0000" maxlength="16"><br>
            
            <div id="div_inputs">
                <i id="iconos" class="fa-regular fa-calendar"></i><p>FECHA DE CADUCIDAD</p>
            </div>
            <input type="date" name="" id="input"><br>

            <div id="div_inputs">
                <i id="iconos" class="fa-solid fa-credit-card"></i><p>COD. DE SEGURIDAD</p>
            </div>
            <input type="text" name="" id="input" placeholder="000" maxlength="3">

            <div id="div_botones">
                <button class="botones" id="pagar">PAGAR</button>
                <button class="botones" id="cancelar">CANCELAR</button>
            </div>

        </section>

    </section>
</template>

<script setup>

</script>

<style scoped>
#principal {
    background-image: url("@/assets/img/fondo.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

#info{
    background-color: #F5F5F5;
    font-size: 36px;
    padding: 40px;
    padding-bottom: 140px;
    margin: 50px;
    margin-top: 120px;
}
.text_info{
    font-weight: bold;
    margin: 40px;
    margin-left: 20px;
}

.text_div{
    font-weight: 200;
    margin: 20px;
}

#inputs{
    font-size: 30px;
}

#texto{
    margin-bottom: 40px;
    font-size: 48px;
    margin-top: 100px;
}

#div_inputs{
    display: flex;
}

#input{
    margin-bottom: 60px;
    margin-top: 30px;
    width: 100vh;
    height: 40px;
    border: 1px solid;
    background-color: #F2F2F2;
    padding: 10px;
    letter-spacing: 6px;
    font-size: 32px;
}

#iconos{
    margin-right: 20px;
}

#div_botones{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 400px;
    margin-bottom: 20px;
}

.botones{
    width: 30vh;
    height: 60px;
    border: 1px solid;
    background-color: #F2F2F2;
    padding: 10px;
    letter-spacing: 4px;
    font-size: 22px;
    font-weight: bold;
}

#pagar{
    background-color: #39B8FF;
    color: #FFFFFF;
}

#cancelar{
    background-color: #636363;
    color: #FFFFFF;
}
</style>

  