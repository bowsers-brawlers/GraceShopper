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
      name: 'Borrasca Rose Cava',
      description:
        "Spain - You don't need a celebration to enjoy this sparkly Spanish Rose goodness with notes of candied strawberries, ripe raspberries, and fragrant pink roses. If you love bubbles like we do, this will be a welcome addition to the table alongside your favorite Prosecco!",
      price: 1200,
      quantity: 4,
      imageUrl:
        'https://www.totalwine.com/dynamic/x220,sq/media/sys_master/twmmedia/he2/h56/13411304570910.png'
    }),

    Products.create({
      name: 'Ed Edmundo Cabernet Sauvignon, 2019',
      description:
        'James Suckling-Mendoza, Argentina - ""Sweet black fruit, black olives and a leafy accent. Ripe, fleshy dark fruit with soft tannin, leading to a spicy finish. Drink now."" What a fantastic Cabernet for the pricepoint, this wine overdelivers in every way!',
      price: 1100,
      quantity: 40,
      imageUrl:
        'https://www.totalwine.com/dynamic/x220,sq/media/sys_master/twmmedia/h44/h86/13290194403358.png'
    }),

    Products.create({
      name: 'Carmen Gran Reserva Cabernet Sauvignon, 2018',
      description:
        'James Suckling-Napa Valley, California - ""Lots of blackberries and wet earth with mahogany and spice. Full-bodied, tight and composed with long, silky tannins. Shows length and depth...already beautiful.""',
      price: 16,
      quantity: 43,
      imageUrl:
        'https://www.totalwine.com/dynamic/x220,sq/media/sys_master/twmmedia/h80/h7d/14057444671518.png'
    }),
    Products.create({
      name: 'Sad Wine',
      description: 'Wine for when you are sad',
      price: 1199,
      quantity: 4,
      imageUrl: defaultProductImg
    }),

    Products.create({
      name: 'Relxaing Wine',
      description: 'Wine for when you are relaxing',
      price: 3199,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Celabratory Wine',
      description: 'Wine for celabrating',
      price: 21199,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Wine',
      description: 'Plain Wine',
      price: 2199,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Green Wine',
      description: 'Wine that is green',
      price: 2199,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Blue Wine',
      description: 'Wine that is blue',
      price: 2199,
      quantity: 4,
      imageUrl: defaultProductImg
    }),
    Products.create({
      name: 'Purple Wine',
      description: 'Wine that is purple',
      price: 2199,
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
