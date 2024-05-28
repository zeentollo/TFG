const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
});

// CONSULTA PARA REGISTRAR AL USUARIO, SI YA EXISTE TIRA UN ERROR YA QUE EN LA DB ESTA PUESTO UNIQUE

const register = async (user) => {
    const new_user = await connection.execute('INSERT INTO user (name, date, email, pass) VALUES (?,?,?,?)', [user.name, user.date, user.email, user.pass]);
};

// CONSULTA PARA LOGGEAR AL USER

const login = async (email, pass) => {
    const [user] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (user.length !== 0) {
        correcto = await bcrypt.compare(pass, user[0].pass);
        return user;
    }
};

// CONSULTA PARA SABER QUE SUBCATEGORIA HA SELECCIONADO EL USUARIO Y ASI PONER LOS PRODUCTOS EN LA WEB

const subcategoria = async (name) => {
    const [subcategoria] = await connection.execute('SELECT * FROM subcategory WHERE name = ?', [name]);
    if (subcategoria.length !== 0) {
        return subcategoria[0].id;
    }
};

// CONSULTA PARA PONER LOS PRODUCTOS EN LA WEB

const productos = async (subcategory) => {
    const [productos] = await connection.execute('SELECT * FROM product WHERE subcategory = ?', [subcategory]);
    if (productos.length !== 0) {
        return productos;
    }
};

const producto = async (id) => {
    const [producto] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (producto.length !== 0) {
        return producto[0];
    }
};


// CONSULTA PARA CREAR Y VER LAS FACTURAS DEL USUARIO Y RESTAR EL STOCK DE LOS PRODUCTOS

const factura = async (user, products, total) =>{
    const fechaHoy = Date.now();
    const tiempoUnix = Math.floor(fechaHoy / 1000);

    await connection.execute('INSERT INTO bill (total, user, date) VALUES (?,?,?)', [total, user, tiempoUnix])
    const [verFactura] = await connection.execute('SELECT * FROM bill WHERE user = ? AND date = ?', [user, tiempoUnix])
    const facturaId = verFactura[0].id
    products.forEach(async (product) => {
        await connection.execute('INSERT INTO bill_product (bill, product) VALUES (?,?)', [facturaId, product])
        await connection.execute('UPDATE product SET stock = stock - 1 WHERE id = ?', [product])
    });
    return facturaId
}

const verFactura = async (id) => {
    const [factura] = await connection.execute('SELECT * FROM bill WHERE id = ?', [id])
    const [productosFactura] = await connection.execute('SELECT * FROM bill_product WHERE bill = ?', [id])
    return {factura: factura[0], productosFactura: productosFactura}
}

module.exports = {
    register,
    login,
    subcategoria,
    productos,
    producto,
    factura,
    verFactura,
};