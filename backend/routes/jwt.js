const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

// HE AÑADIDO JWT PARA QUE SI NO HAS INICIADO SESION NO PUEDAS VER MI WEB YA QUE ES UNA TIENDA PRIVADA

const crearToken =  (id) => {
    try{
        const userToken = jwt.sign({id: id}, process.env.TOKEN_SECRET)
        return userToken
    }catch(error){
        return false
    }
}

module.exports = {
    crearToken
}