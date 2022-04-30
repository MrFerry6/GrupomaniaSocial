const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = JSON.parse(req.headers.authorization.split(' ')[1]);
    const decodedToken = jwt.verify(token.token, process.env.USER_TOKEN, );
    const userId = decodedToken.userId;      
    req.auth = { userId: userId};
    
    next();
    
  } 
  catch {     
    console.log('Error: Unauthorized request !!!')
    res.status(401).json({
      error: new Error('Unauthorized').message
    });
  }
}