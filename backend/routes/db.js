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

const register = async (user) => {
    const new_user = await connection.execute('INSERT INTO user (name, date, email, pass) VALUES (?,?,?,?)', [user.name, user.date, user.email, user.pass]);
    console.log(new_user)
};

const login = async (email, pass) => {
    const [user] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (user.length !== 0) {
        correcto = await bcrypt.compare(pass, user[0].pass);
        return user;
    }
};

const subcategoria = async (name) => {
    const [subcategoria] = await connection.execute('SELECT * FROM subcategory WHERE name = ?', [name]);
    if (subcategoria.length !== 0) {
        return subcategoria[0].id;
    }
};

const productos = async (subcategory) => {
    const [productos] = await connection.execute('SELECT * FROM products WHERE subcategory = ?', [subcategory]);
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

module.exports = {
    register,
    login,
    subcategoria,
    productos,
    producto,
};