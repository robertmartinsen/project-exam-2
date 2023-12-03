import React, { useState, useEffect, useContext } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { fetchVenueById } from "../../services/api/venuebyid"
import { createBooking } from "../../services/api/bookings"
import { fetchBookings } from "../../services/api/bookings"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../../utilities/UserContext"
import { useDispatch } from "react-redux"
import { addBooking } from "../../store/bookingSlice"
import { fetchBookingById } from "../../services/api/bookings"
import classes from "../../styles/pages/auth/BookingConfirmation.module.scss"

const BookingConfirmation = () => {
  const [venue, setVenue] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [selectedDates, setSelectedDates] = useState([])
  const [isBookingAttempted, setIsBookingAttempted] = useState(false)
  const [guests, setGuests] = useState(1)
  const { venueId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useContext(UserContext)

  useEffect(() => {
    const fetchVenueAndBookings = async () => {
      try {
        const venueDetails = await fetchVenueById(venueId)
        setVenue(venueDetails)
        setGuests((prevGuests) => Math.min(prevGuests, venueDetails.maxGuests))
        const bookings = await fetchBookings(venueId)
        processBookedDates(bookings)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchVenueAndBookings()
  }, [venueId])

  const processBookedDates = (bookings) => {
    const dates = bookings.map((booking) => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo),
    }))
    setBookedDates(dates)
  }

  const isDateBooked = (date) => {
    return bookedDates.some((bookedDate) => {
      return date >= bookedDate.start && date <= bookedDate.end
    })
  }

  const handleDateChange = (dates) => {
    setSelectedDates(dates)
    setIsBookingAttempted(false)
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const displayDate = () => {
    if (
      !selectedDates.length ||
      selectedDates[0].getTime() === selectedDates[1].getTime()
    ) {
      return "Choose date"
    } else {
      return `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])}`
    }
  }

  const handleGuestChange = (e) => {
    const newGuests = parseInt(e.target.value, 10)
    if (newGuests <= venue.maxGuests) {
      setGuests(newGuests)
    } else {
      setGuests(venue.maxGuests)
    }
    setIsBookingAttempted(false)
  }

  const confirmBooking = async () => {
    if (
      !selectedDates.length ||
      selectedDates[0].getTime() === selectedDates[1].getTime() ||
      guests <= 0
    ) {
      setIsBookingAttempted(true)
      return
    }

    const bookingData = {
      dateFrom: selectedDates[0].toISOString(),
      dateTo: selectedDates[1].toISOString(),
      guests,
      venueId,
    }

    try {
      const token = localStorage.getItem("token")
      const newBooking = await createBooking(bookingData, token)

      const fullBookingDetails = await fetchBookingById(newBooking.id, token)

      console.log(
        "Dispatching new booking with full details:",
        fullBookingDetails
      )
      dispatch(addBooking(fullBookingDetails))
      navigate("/UserBookings")
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="container col-lg-8 pt-5">
      <div className="text-center">
        <h1>Confirm your booking</h1>
      </div>
      <hr />
      <div className="row align-items-center pt-3">
        <div className="col-md-6 pt-3 align-items-center">
          <h2 className="text-center fs-3">Choose available date</h2>
          <div className="d-flex justify-content-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDates}
              selectRange={true}
              tileDisabled={({ date }) => isDateBooked(date)}
            />
          </div>
        </div>
        <div className="col-md-6 pt-5 pb-5 d-flex justify-content-center">
          <div className={classes.bookingCard}>
            {venue && (
              <div className="row">
                <div className="col-md-4">
                  <img
                    className={classes.bookingMedia}
                    src={venue.media[0]}
                    alt={venue.name}
                  />
                </div>
                <div className="col-md-8">
                  <p className="pt-2 fw-bold me-4 text-center">{venue.name}</p>
                  <p>
                    Date:{" "}
                    <span
                      className={
                        isBookingAttempted && !selectedDates.length
                          ? classes.dateError
                          : ""
                      }
                    >
                      {displayDate()}
                    </span>
                  </p>
                  <p>Max guests: {venue.maxGuests}</p>
                  <div className="row">
                    <div className="col">
                      <p>Guests:</p>
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        value={guests}
                        onChange={handleGuestChange}
                        min="1"
                        max={venue ? venue.maxGuests : 1}
                        className="form-control"
                        placeholder="Number of Guests"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-end pt-4">
              <button
                className={classes.confirmBooking}
                onClick={confirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
