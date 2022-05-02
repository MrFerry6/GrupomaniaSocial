const { DATETIME } = require('mysql/lib/protocol/constants/types');
const { Sequelize } = require('sequelize');
const sequelize = createSequelize();
const Post = require(`../models/post`)(sequelize);
const User = require('../models/user')(sequelize)
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
        video: videoUrl,
        comments: []
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

exports.addComment = (req,res) =>{ 
    const userId = req.auth.userId;
    
    console.log(req.body.textBox);
    Post.findOne({where:{ id: req.body.name}})
    .then((post) => {
      console.log('User found');
      var comments = [];
      
      for(let i=0; post.comments.length > i; i++)
      {
          comments.push(post.comments[i]);
      }
     
      User.findOne({where: {id: post.userId}})
      .then((user)=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        comments.push([req.body.textBox, user.email, date]);

        post.update({
            comments : comments
        })
      })
      .then(() =>{
        console.log('Post Updated!!!')
        res.status(200).json({

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