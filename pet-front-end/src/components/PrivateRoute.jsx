import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const PrivateRoute = ({ children, redirectTo }) => {
  const cookie = Cookies.get('token')

  return <div>{cookie ? children : <Navigate to={redirectTo} />}</div> //If the cookie exist it will return the children, if not it will redirect to the page that I assigned it
}

export default PrivateRoute
