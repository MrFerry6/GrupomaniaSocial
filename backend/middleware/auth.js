const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token.token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) {   
      console.log('Error: Invalid user Id !!!')
      return res.status(401).json({
        error: new Error('Unauthorized').message
      });
    } 
    else{
      next();
    }
  } 
  catch {     
    console.log('Error: Unauthorized request !!!')
    res.status(401).json({
      error: new Error('Unauthorized').message
    });
  }
}