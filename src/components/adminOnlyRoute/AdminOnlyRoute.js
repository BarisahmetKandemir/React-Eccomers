////admin olmayıp da admin sayfasına erişmek isteyenler için permission denied sayfası
import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from "../../redux/slice/authSlice"
import { Link } from 'react-router-dom'

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail)

  if (userEmail === "user1@gmail.com") {
    return children
  }
  else {
    return (
      <section style={{height:"80vh"}}>
        <div className='container'>
          <h2>Permission</h2>
          <p>This page can only be view by an Admin User</p>
          <br/>
          <Link>
          <button className='--btn'>&larr;Back To Home</button>
          </Link>
        </div>
      </section>

    )
  }


}

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail)

  if (userEmail === "user1@gmail.com") {
    return children
  }
  else {
    return null
  }
}

export default AdminOnlyRoute