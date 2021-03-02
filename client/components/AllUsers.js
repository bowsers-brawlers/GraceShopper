import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

// ROUTE ON route.js FILE: /all-users

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log('logged in user id:', this.props.loggedInUserId)
    // ***** SEND A GET REQUEST FOR A SINGLE USER WITH THIS 'LOGGEDINUSERID'
    // see if the user is an admin -> AND THEN send a request for all users
    // *********************************************************************
    this.props.fetchAllUsers()
  }
  render() {
    console.log('All Users ----------------', this.props.allUsers)
    return (
      <div id="all-users-container">
        <div>All users</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.allUsers.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: requestorId => dispatch(fetchAllUsers(requestorId))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
