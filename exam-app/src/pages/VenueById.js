import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchVenueById } from "../services/venueService"
import { fetchVenueWithBookings } from "../services/bookingService"
import { BookingsByVenue } from "../components/Venue/BookingsByVenue"
import classes from "../styles/pages/VenueById.module.scss"
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX, faStar } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../utilities/UserContext"

function VenueById() {
  const { venueId } = useParams()
  const [venue, setVenue] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getVenueDetails = async () => {
      try {
        const venueDetails = await fetchVenueById(venueId)
        setVenue(venueDetails)
      } catch (error) {
        console.error("Error fetching venue details:", error)
      }
    }

    getVenueDetails()
  }, [venueId])

  useEffect(() => {
    const getVenueDetails = async () => {
      try {
        const token = localStorage.getItem("token")
        if (
          user &&
          user.role === "venueManager" &&
          user.venues.includes(venueId)
        ) {
          const venueData = await fetchVenueWithBookings(venueId, token)
          console.log("Venue data with bookings:", venueData)
          setVenue(venueData) // Setting the venue state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching venue details with bookings:", error)
      }
    }

    getVenueDetails()
  }, [venueId, user])

  const [showBookingRestriction, setShowBookingRestriction] = useState(false)
  const [bookingRestrictionMessage, setBookingRestrictionMessage] = useState("")

  const handleBookingClick = () => {
    if (!user) {
      navigate("/login")
      return
    }

    if (user.venueManager) {
      setBookingRestrictionMessage(
        "Venue managers cannot book venues. Log in or sign up as a regular user."
      )
      setShowBookingRestriction(true)
      return
    }

    navigate(`/BookingConfirmation/${venueId}`)
  }

  if (!venue) {
    return <div>Loading...</div>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const displayAmenities = (amenity) => {
    return venue.meta[amenity] ? (
      <FontAwesomeIcon icon={faCheck} />
    ) : (
      <FontAwesomeIcon icon={faX} />
    )
  }

  const displayStars = () => {
    let stars = []
    for (let i = 0; i < Math.floor(venue.rating); i++) {
      stars.push(
        <FontAwesomeIcon key={i} className={classes.stars} icon={faStar} />
      )
    }
    return stars
  }

  if (!venue) {
    return <div>Loading...</div>
  }

  return (
    <div className="container col-md-6 pt-5">
      <div className="row justify-content-center d-flex">
        <div className={`col-md-6 ${classes.venueImageContainer}`}>
          <img
            className={`img-fluid pt-2 ${classes.venueImage}`}
            src={venue.media[0]}
            alt={venue.name}
          />
        </div>
        <div className={`col-md-6 container pt-2 ${classes.venueInfo}`}>
          <h1 className={classes.venueTitle}>{venue.name}</h1>
          <div className="align-items-center">
            <p className="fw-bold">{venue.price} $ / Night</p>
            <p>{displayStars()}</p>
            <div className="justify-content-right d-flex">
              <button onClick={handleBookingClick} className={classes.venuebtn}>
                Book Venue
              </button>
            </div>
          </div>
          <hr />
          <p>
            Location: {venue.location.country}, {venue.location.city},{" "}
            {venue.location.zip}
          </p>
          <p>{venue.description}</p>
          <p>Max Guests: {venue.maxGuests}</p>
          <div className={classes.table}>
            <Table>
              <tbody>
                {["wifi", "breakfast", "parking", "pets"].map(
                  (amenity, index) => (
                    <tr key={index}>
                      <td className={`text-dark ${classes.tableContent}`}>
                        <p>
                          {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        </p>
                      </td>
                      <td className={classes.tableIcon}>
                        <p>{displayAmenities(amenity)}</p>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
          <div>
            <p>Created: {formatDate(venue.created)}</p>
            <p>Last Updated: {formatDate(venue.updated)}</p>
          </div>
        </div>
      </div>

      {showBookingRestriction && (
        <div className={classes.loginPopup}>
          <p>{bookingRestrictionMessage}</p>
          <div className="justify-content-center d-flex row pt-3">
            <div className="d-flex justify-content-center">
              <button
                className={classes.loginBtn}
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </div>
            <div className="pt-3 d-flex justify-content-center">
              <button
                className={classes.cancelBtn}
                onClick={() => setShowBookingRestriction(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <BookingsByVenue
        venue={venue} 
        user={user} 
        venueId={venueId}
        formatDate={formatDate} 
      />
    </div>
  )
}

export default VenueById
