const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

exports.login = (req, res, next) =>{
  User.findOne({where:{ email: req.body.email }})
  .then((user) => {
   logUser(req,user,res);
  })
  .catch(() => {
    console.log('Error: User not found !!!')
    res.status(404).json({
      error: new Error('Not found').message
    });
  }
  );
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
function logUser(req, user, res) {
  bcrypt.compare(req.body.password, user.password)
    .then((valid) => {
      if (!valid) {        
        console.log('Error: Password not valid !!!')
        return res.status(401).json({
          error: new Error('Unauthorize').message
        })
      }
      const token = createToken(user);
      setLog(res, user, token);
    })
    .catch((error) => {
        console.log('Error: User loggin not success !!!');
        res.status(500).json({
          error
        })
      })
}
function setLog(res, user, token) {
  console.log("Logging success !")
  res.status(200).json({
    userId: user.id,
    token: token
  });
}
function createToken(user) {
  return jwt.sign(
    { userId: user.id },
    'RANDOM_TOKEN_SECRET',
    { expiresIn: '24h' });
}