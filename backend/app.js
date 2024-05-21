const express = require('express');
const path = require('path');
const port = 3000

const app = express();

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

app.use(express.static('public'));

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error!');
});

app.listen(port);

console.log(`Servidor ON en el puerto: ${port}`);

module.exports = app;