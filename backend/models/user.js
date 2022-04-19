
const { Sequelize, Model } = require('sequelize');


module.exports = (sequelize) => {//de
    return User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },  
        readPosts: {
            type: Sequelize.JSON,
            allowNull: true
        },
        unreadPosts: {
            type: Sequelize.JSON,
            allowNull: true
        }
    },
        {
            timestamps: false
        });
}
