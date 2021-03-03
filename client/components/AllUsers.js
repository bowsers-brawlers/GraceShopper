// CHECKING USER STORE FOR USER TO SEE IF ADMIN
// -> HOW TO HANDLE IF USER CLOSES TAB BUT COMES BACK (STORE RESETS?)

// *** SHOULD THIS COMPONENT BE RENDERED ONCLICK FROM SINGLEUSER VIEW (IF ADMIN)
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchAllUsers} from '../store/allUsers'
import UserCell from './UserCell'

// ROUTE ON route.js FILE: /all-users

class AllUsers extends React.Component {
  async componentDidMount() {
    console.log('logged in user id:', this.props.loggedInUserId)

    if (this.props.user && this.props.user.isAdmin === 'true') {
      await this.props.fetchAllUsers()
    }
  }
  render() {
    if (this.props.user.isAdmin === 'false') {
      return <Redirect to="/home" />
    } else {
      console.log('All Users ----------------', this.props.allUsers)
      return (
        <div id="all-users-container">
          <div>You are an Admin!</div>
          {this.props.allUsers.map(user => (
            <UserCell key={user.id} userCellObj={user} />
          ))}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    allUsers: state.allUsers.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: requestorId => dispatch(fetchAllUsers(requestorId))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
