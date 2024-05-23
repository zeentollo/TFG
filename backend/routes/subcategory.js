const express = require('express');
const routes = express.Router();
const { subcategoria } = require('./db');

routes.post('/subcategoria', async (req, res) => {
    const { id } = req.body;

    try {
        const ver_subcategoria = await subcategoria(id);
        console.log(ver_subcategoria)
        if (!ver_subcategoria) {
            return res.status(404).send('Subcategoria no encontrado');
        }

        res.status(200).send(JSON.stringify(ver_subcategoria));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = routes;