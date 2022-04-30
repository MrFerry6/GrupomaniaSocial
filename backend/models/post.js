const { type } = require('@testing-library/user-event/dist/type');
const { TIMESTAMP } = require('mysql/lib/protocol/constants/types');
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
        },
        video:{
            type: Sequelize.STRING,
            allowNull: true
        },
        comments: {
            type: Sequelize.JSON}
            ,
        createdAt: { type: Sequelize.DATE, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
        deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }        
    },
        {
            timestamps: true
        });
}