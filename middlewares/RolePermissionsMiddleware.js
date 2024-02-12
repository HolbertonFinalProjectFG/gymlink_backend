function PermissionsMiddleware(req, res, next, num) {
  try{
    if (req.user.user_role[0] !== num) throw new Error('Permissions error');
    next()
  } catch(err) {
    res.status(401).json({ok: false, msg: err.message})
  }
}

module.exports = {
  PermissionsMiddleware
}