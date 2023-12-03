import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, cancelBooking } from "../../store/bookingsActions"
import classes from "../../styles/pages/auth/UserBookings.module.scss"

function UserBookings() {
  const dispatch = useDispatch()
  const bookings = useSelector((state) => state.bookings.bookings)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  console.log("Updated bookings: ", bookings)

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const handleCancelClick = (booking) => {
    console.log("Cancel clicked for booking:", booking)
    setShowConfirm(true)
    setSelectedBooking(booking)
  }

  const [canceledBookingIds, setCanceledBookingIds] = useState([])

  const confirmCancellation = async () => {
    if (selectedBooking) {
      const token = localStorage.getItem("token")
      await dispatch(cancelBooking(selectedBooking.id, token))
      setCanceledBookingIds((prev) => [...prev, selectedBooking.id])
      setShowConfirm(false)
    }
  }

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch, canceledBookingIds])

  if (!bookings.length) {
    return (
      <div>
        <div className="pt-4">
          <h1 className="text-center">My Bookings</h1>
        </div>
        <div className="container col-lg-8 pt-4 ">
          <h2 className="fs-3">Upcoming bookings</h2>
          <hr />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="pt-4">
        <h1 className="text-center">My Bookings</h1>
      </div>
      <div className="container col-lg-8 pt-4 ">
        <h2 className="fs-3">Upcoming bookings</h2>
        <hr />
        {bookings.map((booking) => (
          <div key={booking.id} className={classes.bookingInfoCard}>
            <div className="row pt-3">
              <div className="col">
                {booking.venue.media && booking.venue.media.length > 0 && (
                  <Link to={`/VenueById/${booking.venue.id}`}>
                    <img
                      className={classes.bookingsMedia}
                      src={booking.venue.media[0]}
                      alt={booking.venue.name}
                    />
                  </Link>
                )}
              </div>
              <div className="col">
                <Link
                  className={classes.bookingTitle}
                  to={`/VenueById/${booking.venue.id}`}
                >
                  <p className="fw-bold text-center text-dark">
                    {booking.venue.name}
                  </p>
                </Link>
                <p className="text-center">
                  {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
              </div>
              <div className="col">
                <p className="d-flex justify-content-end">
                  Guests: {booking.guests}
                </p>
                <div className="d-flex justify-content-end">
                  <button
                    className={
                      canceledBookingIds.includes(booking.id)
                        ? `${classes.canceledBtn}`
                        : `${classes.cancelBtn}`
                    }
                    onClick={() => handleCancelClick(booking)}
                    disabled={canceledBookingIds.includes(booking.id)}
                  >
                    {canceledBookingIds.includes(booking.id)
                      ? "Canceled"
                      : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className={classes.confirmationPopup}>
          <p>
            Are you sure you want to cancel{" "}
            <span className="fw-bold">{selectedBooking?.venue.name}</span>?
          </p>
          <div className="justify-content-center d-flex row">
            <div className="col justify-content-end d-flex">
              <button className={classes.yesBtn} onClick={confirmCancellation}>
                Yes
              </button>
            </div>
            <div className="col justify-content-start d-flex">
              <button
                className={classes.noBtn}
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserBookings
