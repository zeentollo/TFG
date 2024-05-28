const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const { login } = require('./db');
const { crearToken } = require('./jwt')

routes.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    
    try {
        const user = await login(email, pass);

        if (!user) {
            return res.status(404).send('Ese usuario no es correcto');
        }
        const token = crearToken(user[0].id)

        res.status(200).send(JSON.stringify([user, token]));

        console.log(user)
    } catch (err) {
        res.status(500).send('Error al loggear');
    }
});

module.exports = routes;
