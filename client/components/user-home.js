import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props.email
  const {imageUrl} = props.imageUrl
  const {firstName} = props.firstName
  const {lastName} = props.lastName
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <img src={imageUrl} />
      <div>Your first name is: {firstName}</div>
      <div>Your last name is: {lastName}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string
}
