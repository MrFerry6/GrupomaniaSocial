const express = require('express');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post')
const bodyParser = require('body-parser');
const app = express();
const sequelize = createSequelize();

setHeaders();
conectMySqlDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(process.cwd() + '/images'));
app.use('/videos', express.static(process.cwd() + '/videos'));

app.use('/api/auth', userRoutes);
app.use('/api/users', postRoutes);


module.exports = app;

function conectMySqlDB() {
  sequelize.authenticate()
    .then(() => {
      console.log('Secualize Conected to MySql DB !');

    })
    .catch((error) => {
      console.log('Secualize Not Conected to DB Error: ', error.message);
    });
}

function createSequelize() {
  require('dotenv').config();
  return new Sequelize({
    database: 'mydb',
    host: 'localhost',
    username: process.env.DB_USER, 
    password: process.env.DB_PASS,   
    dialect: 'mysql'
  });
}

function setHeaders() {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
}

