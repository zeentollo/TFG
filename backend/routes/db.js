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
    await connection.execute('INSERT INTO user (name, date, email, pass) VALUES (?,?,?)', [user.name, user.date, user.email, user.pass]);
};

const login = async (email, pass) => {
    const [user] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (user.length !== 0) {
        correcto = await bcrypt.compare(pass, user[0].pass);
        if (correcto) {
            return user[0].id
        } else {
            return false;
        }
    }else{
        return false;
    }
};

module.exports = {
    register,
    login
};