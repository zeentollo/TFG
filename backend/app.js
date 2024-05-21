const express = require('express');
const path = require('path');
const cors = require('cors');
const port = 3000

const app = express();

app.use(cors());
app.use(express.json());

const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');

app.use(express.static('public'));

app.use('/', loginRouter);
app.use('/', registerRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error!');
});

app.listen(port);

console.log(`Servidor ON en el puerto: ${port}`);

module.exports = app;