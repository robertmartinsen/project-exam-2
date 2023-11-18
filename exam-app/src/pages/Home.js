import React, { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import classes from "./Home.module.scss"
import { NavLink } from "react-router-dom"
import fetchVenues from "../services/venues"
import Slider from "../components/Slider"

function Home() {
  const [upcomingVenues, setUpcomingVenues] = useState([])

  useEffect(() => {
    const fetchSortedVenues = async () => {
      try {
        const fetchedVenues = await fetchVenues()
        const sortedVenues = fetchedVenues
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .slice(0, 6)
        setUpcomingVenues(sortedVenues)
      } catch (error) {
        console.error("Failed to fetch venues:", error)
      }
    }

    fetchSortedVenues()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <h1 className="text-center pt-4 pb-4 container">
        Welcome to <span className="text-secondary">Holi</span>
        <span className="text-dark">daze</span>
      </h1>

      <div className={classes.shapedivider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>

      <div className={`pt-4 pb-5 ${classes.exploreContainer}`}>
        <div className="container col-md-8">
          <Row className="gx-0 gx-md-5">
            <Col md={6} className="d-flex flex-column pb-3">
              <div>
                <h2 className="text-white fw-bold">
                  <span className="text-secondary">E</span>xplore{" "}
                  <span className="text-secondary">O</span>ur{" "}
                  <span className="text-secondary">V</span>enues
                </h2>
              </div>
              <div>
                <p className="text-light">
                  Welcome to Holidaze, your ultimate destination for discovering
                  and booking the perfect venue for your next holiday. At
                  Holidaze, we believe that finding the right place to stay
                  should be simple, seamless, and satisfying.
                </p>
              </div>
              <div>
                <h2 className="text-white fw-bold">
                  <span className="text-secondary">F</span>or{" "}
                  <span className="text-secondary">V</span>enue{" "}
                  <span className="text-secondary">M</span>anagers
                </h2>
              </div>
              <div>
                <p className="text-light">
                  Behind the scenes, we empower venue owners with a powerful
                  admin interface to register, manage, and showcase their
                  properties. Our robust platform offers tools that make it easy
                  to keep track of bookings, update venue details, and connect
                  with guests.
                </p>
              </div>
            </Col>

            <Col md={6} className={classes.lowerCol}>
              <h3 className="text-white text-center">Lets get started!</h3>
              <Slider />
              <div className="justify-content-center d-flex pt-4">
                <NavLink to="/Venues" className={classes.explorebtn}>
                  Explore Venues
                </NavLink>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className={classes.venuesContainer}>
        <div className="container col-md-8">
          <h3 className="pt-4 text-center text-white">Latest Events</h3>
          <div className="row pt-3">
            {upcomingVenues.map((venue) => (
              <div
                key={venue.id}
                className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
              >
                <div className={classes.card}>
                  <img
                    className={classes.eimage}
                    src={venue.media[0]}
                    alt={venue.name}
                  />
                  <div className={classes.cardBody}>
                    <div className={`mt-3 ${classes.cardContent}`}>
                      <p>{venue.name}</p>
                      <p>{formatDate(venue.created)}</p>
                      <p>{venue.location.country}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <NavLink
                        to={`/VenueById/${venue.id}`}
                        className={classes.venuebtn}
                      >
                        Bookings & Info
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
