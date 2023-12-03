import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ProfileCard from "../../components/ProfileCard"
import { NavLink } from "react-bootstrap"
import { fetchBookings } from "../../store/bookingsActions"
import classes from "../../styles/pages/auth/UserBookings.module.scss"

function UserProfile() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.bookings.bookings)

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  return (
    <div className="pt-4">
      <div className="text-center">
        <h1>My Profile</h1>
      </div>
      <div>
        <ProfileCard />
      </div>

      <div className="container col-md-8 pt-5">
        <div>
          <h3>My Upcoming Venues</h3>
        </div>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className={classes.bookingInfoCard}>
              <div className="row pt-3">
                <div className="col">
                  {booking.venue.media && booking.venue.media.length > 0 && (
                    <img
                      className={classes.bookingsMedia}
                      src={booking.venue.media[0]}
                      alt={booking.venue.name}
                    />
                  )}
                </div>
                <div className="col">
                  <p className="fw-bold text-center">{booking.venue.name}</p>
                  <p className="text-center">
                    {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                </div>
                <div className="col">
                  <p className="d-flex justify-content-end">
                    Guests: {booking.guests}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={`${classes.venuesBox}`}>
            <p className="fs-5">
              Seems like you don't have any upcoming venues...
              <NavLink className={`${classes.venuesBtn}`} to="/Venues">
                Click here.
              </NavLink>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
