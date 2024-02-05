////admin olmayıp da admin sayfasına erişmek isteyenler için permission denied sayfası
import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from "../../redux/slice/authSlice"

const AdminOnlyRoute = () => {
  return (
    <div>AdminOnlyRoute</div>
  )
}

export const AdminOnlyLink = ({children}) => {
  const userEmail = useSelector(selectEmail)

  if(userEmail === "user1@gmail.com"){
    return children
  }
  else{
    return null
  }
}

export default AdminOnlyRoute