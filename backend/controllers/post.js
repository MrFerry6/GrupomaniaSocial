const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const Post = require(`../models/post`)(sequelize);
exports.post = (req, res, next) => {

    const body = req.body;
    Post.create({
        title: body.title,
        text: body.text
    })
        .then((post) => {
            console.log("Post saved !!!")

            res.status(201).json({
                message: 'Saved !!!'
            })
        })
        .catch((error) => {
            console.log('Error: User not saved')
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