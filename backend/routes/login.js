const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const { comprobar_user } = require('./db');

routes.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    
    const pass_crypt = await bcrypt.hash(pass, 8);    

    const usuario_login = await comprobar_user(email, pass);
    
});

module.exports = routes;