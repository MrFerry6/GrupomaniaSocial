const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const Post= require(`../models/post`)(sequelize);

exports.post = (req, res, next) => {
    const body = req.body;

    Post.create({
        userId: req.auth.userId,
        title: body.title,
        text: body.text,
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
exports.getPost = (req,res,next) => {
    Post.findAll()
    .then((post) => {
        console.log('Sauces found !')
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