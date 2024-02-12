const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config')

function verifyToken(token) {
  try{
    console.log(`verify====>>>${token}`)
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return {ok: true, data: decoded};
  } catch (err) {
    return {ok: false, data: err};
  }
}

function JwtMiddleware(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new Error('JWT token not provided');
    console.log(`====>>>${token}`)

    const verifyResult = verifyToken(token);
    console.log(`\n\nresult===>>>${verifyResult.ok}`)
    
    if (verifyResult.ok){
      req.user = verifyResult.data;
      next();
    } else {
      console.log(`============>>>>>>>>>${verifyResult.data}`)
      res.status(401).json({ok: false, msg: verifyResult.data.message})
    }
  } catch (err) {
    console.log(err);
    if (err.message === 'JWT token not provided') {
      res.status(400).json({ok: false, msg: "JWT token not provided"});
    }
    else {
      res.status(500).json({ok: false, msg: err.message});
    }
  }
}

module.exports = {
  JwtMiddleware
}
