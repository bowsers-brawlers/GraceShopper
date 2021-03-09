import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const AddProductButton = ({isAdmin}) => {
  if (isAdmin === 'true') {
    return (
      <div>
        <Link to="/create-product">Add New Product</Link>
        <Link to="/all-users">All Users</Link>
      </div>
    )
  } else {
    return ''
  }
}

const MainNav = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/red-wine">Red</NavLink>
      <NavLink to="/white-wine">White</NavLink>
      <NavLink to="/rose-wine">Rose</NavLink>
      <NavLink to="/sparkling">Sparkling</NavLink>
      <NavLink to="/port">Port</NavLink>
    </nav>
  )
}

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="section">
    <h1 className="title">
      <Link to="/">Wine</Link>
    </h1>
    <nav>
      {isLoggedIn ? (
        <div className="header-nav">
          {/* The navbar will show these links after you log in */}
          <MainNav />
          <nav>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/edit">Edit My Account</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <AddProductButton isAdmin={isAdmin} />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/guest-cart">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
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
