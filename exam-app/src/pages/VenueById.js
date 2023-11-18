import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchVenueById } from "../services/venuebyid"
import { NavLink } from "react-router-dom"
import classes from "./VenueById.module.scss"
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX, faStar } from "@fortawesome/free-solid-svg-icons"

function VenueById() {
  const { venueId } = useParams()
  const [venue, setVenue] = useState(null)

  useEffect(() => {
    const getVenueDetails = async () => {
      const venueDetails = await fetchVenueById(venueId)
      setVenue(venueDetails)
    }

    getVenueDetails()
  }, [venueId])

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
              <NavLink to="/Login" className={classes.venuebtn}>
                Book Venue
              </NavLink>
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
    </div>
  )
}

export default VenueById
