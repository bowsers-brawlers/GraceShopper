const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// base path: /api/users

router.get('/', async (req, res, next) => {
  try {
    // const {requestorId} = req.params
    // console.log(requestorId)
    // const requestor = await User.findByPk(requestorId)
    // console.log(requestor)
    // if (requestor.isAdmin === 'true') {
    //   const users = await User.findAll({
    //     // explicitly select only the id and email fields - even though
    //     // users' passwords are encrypted, it won't help if we just
    //     // send everything to anyone who asks!
    //     attributes: ['id', 'email'],
    //   })
    //   res.status(200).json(users)
    // } else {
    //   res.sendStatus(405)
    // }

    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = User.findByPk(req.params.userId, {
      attributes: ['id', 'email']
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
