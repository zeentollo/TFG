const express = require('express');
const routes = express.Router();
const { producto, productos } = require('./db');

routes.post('/producto', async (req, res) => {
    const { id } = req.body;

    try {
        const ver_producto = await producto(id);
        console.log(ver_producto)
        if (!ver_producto) {
            return res.status(404).send('Producto no encontrado');
        }

        res.status(200).send(JSON.stringify(ver_producto));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


routes.post('/productos', async (req, res) => {
    const { subcategory } = req.body;

    try {
        const ver_productos = await productos(subcategory);
        console.log(ver_productos)
        if (!ver_productos) {
            return res.status(404).send('Productos no encontrado');
        }

        res.status(200).send(JSON.stringify(ver_productos));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = routes;