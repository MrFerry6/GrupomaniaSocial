const { Sequelize } = require('sequelize');


module.exports = (sequelize) => {
    return Post = sequelize.define('Post', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        text: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image:{
            type: Sequelize.STRING,
            allowNull: true
        }
        
    },
        {
            timestamps: false
        });
}