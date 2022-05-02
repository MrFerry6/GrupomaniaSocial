
const { Sequelize, Model } = require('sequelize');


module.exports = (sequelize) => {
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
            allowNull: false
        },
        unreadPosts: {
            type: Sequelize.JSON,
            allowNull: false
        }
    },
        {
            timestamps: false
        });
}
