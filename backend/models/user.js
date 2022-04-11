
const { Sequelize, Model} = require('sequelize');


module.exports = (sequelize) => {
return  User = sequelize.define('User', {
   /*id:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },*/
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    /*position:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    
    deparment:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    
    photo:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },*/
},
{
    timestamps: false
  });
}
