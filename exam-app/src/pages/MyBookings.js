import React from "react"
import { NavLink } from "react-router-dom"
import classes from "./MyBookings.module.scss"

function MyBookings() {
  return (
    <div className="MyBookings">
      <div className="container pt-5 col-md-8">
        <h1 className="text-center">
          Oops... Seems like you are not signed in
        </h1>
        <h2 className="text-center pt-4">Sign in to see your bookings!</h2>
        <div className={`pt-4 d-flex justify-content-center`}>
          <NavLink className={classes.signInBtn} to="/Login">
            Click Here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default MyBookings
