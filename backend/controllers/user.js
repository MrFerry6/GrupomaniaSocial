const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require(`../models/user`)(sequelize);
const PasswordValidator = require('password-validator');


exports.singup = (req, res, next) => {
const body = req.body;
if (!validateEmail(body.email)) {
  console.log('Error: not valid email !!!');
  return res.status(400).json({
    error: new Error('Bad Request').message
  })
}

if (!validatePassword(body.password)) {
  console.log('Error: not valid password !!!');
  return res.status(400).json({
    error: new Error('Bad Request').message
  })
}
bcrypt.hash(body.password, 10)
  .then((hash) => {
      User.create({
        email: body.email,
        password: hash,
        readPosts: [],
        unreadPosts: []
      })
        .then((user) => {
          console.log("User saved !!!")
          
          res.status(201).json({
            token: createToken(user)
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

exports.auth = (req, res) => {
  const token = JSON.parse(req.body.token);
  if(jwt.verify(token.token, process.env.USER_TOKEN, )){
    const decodedToken = jwt.verify(token.token, process.env.USER_TOKEN, );
    return res.status(200).json({
      logged : true,
      userId : decodedToken.userId//is neccesary?
    });
  }
  else{
    return res.status(403).json({
      logged : false
  });}
}

exports.deleteUser = (req, res) => {
  User.findOne({where:{ id: req.auth.userId }})
  .then((user) => {
      user.destroy();      
      console.log("User deleted !!!")
      res.status(200).json({
        message: 'Ok!'
      })
  })  
  .catch(() => {
    console.log('Error: User not found !!!')
    res.status(404).json({
      error: new Error('Not found').message
    })
  })
}
exports.getUser = (req, res) =>{
  const userId = req.auth.userId;
  User.findOne({where:{ id: userId }})
  .then((user) => {
    console.log('User found');
    res.status(200).json({
     user
    })
  })
  .catch(() => {
    console.log('Error: User not found !!!')
    res.status(404).json({
      error: new Error('Not found').message
    });
  });
}
exports.modifyUnread = (req,res) =>{
  const userId = req.auth.userId;
  User.findOne({where:{ id: userId }})
  .then((user) => {
    console.log('User found');
    user.update({
      unreadPosts: req.body
    })

    .then(() =>{
      console.log('User Updated!!!')
      res.status(200).json({
        user
    })
  })
  .catch(() => {
    console.log('Error: User not found !!!')
    res.status(404).json({
      error: new Error('Not found').message
    });
  });
})}
exports.modifyRead = (req,res) =>{
  const userId = req.auth.userId;
  User.findOne({where:{ id: userId }})
  .then((user) => {
    console.log('User found');
    user.update({
      readPosts: req.body
    })

    .then(() =>{
      console.log('User Updated!!!')
      res.status(200).json({
        user
    })
  })
  .catch(() => {
    console.log('Error: User not found !!!')
    res.status(404).json({
      error: new Error('Not found').message
    });
  });
})}
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
function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
function validatePassword(password){
  var passShema = new PasswordValidator();
  passShema.is().min(8);
  passShema.is().max(25);
  passShema.has().uppercase();
  passShema.has().lowercase();
  passShema.has().not().spaces();
  return passShema.validate(password);
}
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
  console.log("Logging success !");
  res.status(200).json({
    token: token,
    id: user.id
  });
}
function createToken(user) {
  return jwt.sign(
    { userId: user.id },
    process.env.USER_TOKEN, 
    { expiresIn: '24h' });
}