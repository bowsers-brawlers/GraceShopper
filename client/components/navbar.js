import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const AdminNav = ({isAdmin}) => {
  if (isAdmin === 'true') {
    return (
      <div>
        <Link className="button is-warning" to="/create-product">
          Add New Product
        </Link>
        <Link className="button is-warning" to="/all-users">
          All Users
        </Link>
      </div>
    )
  } else {
    return ''
  }
}

const MainNav = () => {
  return (
    <>
      <NavLink className="navbar-item" to="/">
        Home
      </NavLink>
      <NavLink className="navbar-item" to="/category/red-wine">
        Red
      </NavLink>
      <NavLink className="navbar-item" to="/category/white-wine">
        White
      </NavLink>
      <NavLink className="navbar-item" to="/category/rose-wine">
        Rose
      </NavLink>
      <NavLink className="navbar-item" to="/category/sparkling">
        Sparkling
      </NavLink>
      <NavLink className="navbar-item" to="/category/port">
        Port
      </NavLink>
    </>
  )
}

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <header className="section">
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="title">
          <Link to="/" className="navbar-item">
            Wine
          </Link>
        </h1>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      {isLoggedIn ? (
        <div className="navbar-menu">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-start">
            <MainNav />
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons" style={{'flex-direction': 'column'}}>
                <div>
                  <a
                    className="button is-danger is-light"
                    href="#"
                    onClick={handleClick}
                  >
                    Logout
                  </a>
                  <Link className="button" to="/edit">
                    Edit My Account
                  </Link>
                  <Link className="button is-success" to="/cart">
                    Cart
                  </Link>
                </div>
                <AdminNav isAdmin={isAdmin} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-menu">
          <div className="navbar-start">
            <MainNav />
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* The navbar will show these links before you log in */}
                <Link className="button" to="/login">
                  Login
                </Link>
                <Link className="button" to="/signup">
                  Sign Up
                </Link>
                <Link className="button" to="/guest-cart">
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  </header>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
