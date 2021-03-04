'use strict'

const db = require('../server/db')

const {User, Products} = require('../server/db/models')
const userSeed = require('./UserSeed')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const defaultProductImg =
    'https://media.istockphoto.com/vectors/mockup-wine-bottle-vector-design-vector-id521084070?k=6&m=521084070&s=170667a&w=0&h=7rr67EPk11FEU_G3XLBCJbmfok48nOSnl7FRNsraqxg='

  const products = await Promise.all([
    Products.create({
      name: 'Wine that is red',
      description: '123',
      price: 12,
      quantity: 4,
      imageUrl: defaultProductImg
    }),

    Products.create({
      name: 'White Wine',
      description: 'Wine that is white',
      price: 12,
      quantity: 4,
      imageUrl: defaultProductImg
    }),

    Products.create({
      name: 'Party Wine',
      description: 'Wine for parties',
      price: 21,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Sad Wine',
      description: 'Wine for when you are sad',
      price: 11,
      quantity: 4,
      imageUrl: defaultProductImg
    }),

    Products.create({
      name: 'Relxaing Wine',
      description: 'Wine for when you are relaxing',
      price: 31,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Celabratory Wine',
      description: 'Wine for celabrating',
      price: 211,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Wine',
      description: 'Plain Wine',
      price: 21,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Green Wine',
      description: 'Wine that is green',
      price: 21,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Blue Wine',
      description: 'Wine that is blue',
      price: 21,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Purple Wine',
      description: 'Wine that is purple',
      price: 21,
      quantity: 4,
      imageUrl: defaultProductImg
    })
  ])

  const users = await Promise.all(
    userSeed.map(user => {
      console.log(user)
      return User.create(user)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
