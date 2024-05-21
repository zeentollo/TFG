const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const { register } = require('./db');

routes.post('/', async (req, res) => {
    const { name, date, email, pass } = req.body;

    const pass_crypt = await bcrypt.hash(pass, 8);

    await register({ name: name, date: date, email: email, pass: pass_crypt });

});

module.exports = routes;