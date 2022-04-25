const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const Post= require(`../models/post`)(sequelize);

exports.post = (req, res, next) => {
    const body = req.body;
    let imageUrl = null;
    let videoUrl = null;
    if(!body.image)
    {imageUrl = JSON.stringify(req.file.path)}
    if(!body.video)
    {videoUrl = JSON.stringify(req.file.path)}
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
            console.log('Error: Post not saved'+error)
            res.status(500).json({
                error
            })
        })
}
exports.getPosts = (req,res,next) => {
    Post.findAll()
    .then((post) => {
        console.log('Posts found !')
        res.status(200).json(post);

      }
    )
    .catch(() => {
      console.log('Error: Sauces not found');
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