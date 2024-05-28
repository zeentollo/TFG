const express = require('express');
const routes = express.Router();
const { factura, verFactura } = require('./db');

// RUTA PARA ENLAZAR CON EL FRONT Y CREAR LA FACTURA

routes.post('/factura', async (req, res) => {
    const { user, total, productos } = req.body;

    try {
        const crearFactura = factura(user, productos, total)
        res.status(200).send(JSON.stringify(crearFactura));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

routes.post('/verfactura', async (req, res) => {
    const { factura } = req.body;

    try {
        const consultarFactura = verFactura(factura)
        res.status(200).send(JSON.stringify(consultarFactura));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = routes;