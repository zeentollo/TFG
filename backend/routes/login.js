const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const { login } = require('./db');

routes.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await login(email, pass);
        console.log(user)
        if (!user) {
            return res.status(404).send('Ese usuario no es correcto');
        }

        res.status(200).send(JSON.stringify(user));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al loggear');
    }
});

module.exports = routes;
