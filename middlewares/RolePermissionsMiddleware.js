function PermissionsMiddleware(roles) {
  return function (req, res, next) {
    try{
      if (!roles.includes(req.user.user_role[0]))
        throw new Error('Permissions error');
      next();
    } catch(err) {
      res.status(401).json({ok: false, msg: err.message});
    }
  }
}

module.exports = {
  PermissionsMiddleware
}
