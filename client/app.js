import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <section className="section">
        <Navbar />
        <Routes />
      </section>
      <Footer />
    </>
  )
}

export default App
