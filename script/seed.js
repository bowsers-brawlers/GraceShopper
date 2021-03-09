'use strict'

const db = require('../server/db')

const {User, Products, Category} = require('../server/db/models')
const userSeed = require('./UserSeed')
const productSeed = require('./productSeed')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(
    userSeed.map(user => {
      return User.create(user)
    })
  )
  const categorySeed = (module.exports = [
    {name: 'Red Wine', slug: 'red-wine'},
    {name: 'White Wine', slug: 'white-wine'},
    {name: 'Rose Wine', slug: 'rose-wine'},
    {name: 'Champagne & Sparkling Wine', slug: 'sparkling'},
    {name: 'Port', slug: 'port'}
  ])

  const categories = await Promise.all(
    categorySeed.map(cat => {
      return Category.create(cat)
    })
  )
  const products = await Promise.all(
    productSeed.map(prod => {
      return Products.create(prod)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
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
