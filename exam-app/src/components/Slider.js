import React, { useEffect, useState } from "react"
import Carousel from "react-bootstrap/Carousel"
import fetchVenues from "../services/api/venues"
import classes from "../styles/components/Slider.module.scss"

function Slider() {
  const [venues, setVenues] = useState([])

  useEffect(() => {
    const fetchSortedVenues = async () => {
      try {
        const fetchedVenues = await fetchVenues()
        const sortedVenues = fetchedVenues
          .sort((a, b) => new Date(a.created) - new Date(b.created))
          .slice(0, 3)
        setVenues(sortedVenues)
      } catch (error) {
        console.error("Failed to fetch venues:", error)
      }
    }

    fetchSortedVenues()
  }, [])

  return (
    <div className={classes.citem}>
      <Carousel>
        {venues.map((venue, idx) => (
          <Carousel.Item key={idx}>
            <img
              className={classes.cimage}
              src={venue.media[0]}
              alt={`Venue ${idx}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
