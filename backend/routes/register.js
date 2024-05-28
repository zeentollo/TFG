const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const { register } = require('./db');

// RUTA PARA CONFIGURAR EL REGISTRO DE NUEVOS USUARIOS

routes.post('/register', async (req, res) => {
    const { name, date, email, pass } = req.body;

    const pass_crypt = await bcrypt.hash(pass, 8);
    try {
        await register({ name: name, date: date, email: email, pass: pass_crypt });
        res.status(200).send()
    }catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
    


});

module.exports = routes;