const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const bcrypt = require('bcrypt');


const User = require(`../models/user`)(sequelize);

exports.singup = (req, res, next) => {

  if (!validateEmail(req.body.email)) {
    console.log('Error: not valid email !!!');
    return res.status(400).json({
      error: new Error('Bad Request').message
    })
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        //position: 'photo',    
        //deparment: 'photo',    
        //photo: 'photo'
      })
        .then(() => {
          console.log("User saved !!!")
          res.status(201).json({
            message: 'created'
          })
        })
        .catch((error) => {
          console.log('Error: User not saved')
          res.status(500).json({
            error
          })
        })
    })
    .catch((error) => {
      console.log('Error: Hash not was created !!!');
      res.status(500).json({
        error
      })
    })
}

function createSequelize() {
  return new Sequelize({
    database: 'mydb',
    host: 'localhost',
    username: 'root',
    password: '1234',
    dialect: 'mysql'
  });
}
function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};