const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const Post = require(`../models/post`)(sequelize);

exports.post = (req, res, next) => {
    const body = req.body;
    let imageUrl = null;
    let videoUrl = null;
    if (!body.image) { imageUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path }

    if (!body.video) { videoUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path }
    Post.create({
        userId: req.auth.userId,
        title: body.title,
        text: body.text,
        image: imageUrl,
        video: videoUrl
    })
        .then((post) => {
            console.log("Post saved !!!")

            res.status(201).json({
                message: 'Saved !!!'
            })
        })
        .catch((error) => {
            console.log('Error: Post not saved' + error)
            res.status(500).json({
                error
            })
        })
}
exports.getPosts = (req, res, next) => {
    Post.findAll({ order: [['updated_At', 'DESC']]})
        .then((post) => {
            console.log('Posts found !')
            res.status(200).json(post);

        }
        )
        .catch(() => {
            console.log('Error: Post not found');
            res.status(404).json({
                error: new Error('Not found').message
            });
        }
        );
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