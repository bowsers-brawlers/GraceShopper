function protectedRoute(req, res, next) {
  if (req.user && req.user.isAdmin === 'true') {
    console.log('User Is Admin')
    next()
  } else {
    res.status(403).send('Forbidden')
  }
}

function protectedId(req, res, next) {
  if (
    req.user &&
    (req.user.id == req.params.userId || req.user.isAdmin === 'true')
  ) {
    console.log(req.user.id)
    next()
  } else {
    res.status(403).send('Forbidden')
  }
}

module.exports = {protectedRoute, protectedId}
