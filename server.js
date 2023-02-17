require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgsession = require('connect-pg-simple')(session);

const { Pool } = require("pg")
const databaseConnectionSettings = {
    user: "postgres",
    password: "password",
    host: "localhost",
    port: "5432",
    database: "postgres",
}

const db = new Pool(databaseConnectionSettings)

const app = express()
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');


const PORT = process.env.PORT || 5500;

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('checkout', require('./routes/checkout'));
app.use('bikeDatabase', require('./routes/bikeDatabase'));
app.use('bikeLocations', require('./routes/bikeDatabase'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));