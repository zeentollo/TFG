const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

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