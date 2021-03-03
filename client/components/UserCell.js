// CHECKING USER STORE FOR USER TO SEE IF ADMIN
// -> HOW TO HANDLE IF USER CLOSES TAB BUT COMES BACK (DOES STORE RESET???)

// LINKS TO SINGLE USER VIEW /all-users/id

import React from 'react'
import {Link} from 'react-router-dom'

const UserCell = props => {
  const {id, firstName, lastName, email} = props.userCellObj
  return (
    <div id="user-cell">
      <div id="user-details">
        <Link to={`/all-users/${id}`}>
          <div>{`${firstName} ${lastName}`}</div>
          <div>{`${email}`}</div>
        </Link>
      </div>
    </div>
  )
}

export default UserCell
