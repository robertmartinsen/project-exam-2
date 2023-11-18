import React, { useState, useEffect } from "react"
import classes from "./Venues.module.scss"
import { NavLink } from "react-router-dom"
import fetchVenues from "../services/venues"
import SearchBar from "../components/SearchBar"
import { sortVenues } from "../utilities/sort"
import { filterVenues } from "../utilities/filter"

function Venues() {
  const [venues, setVenues] = useState([])
  const [filteredVenues, setFilteredVenues] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [filterOptions, setFilterOptions] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  })
  const [showFilterBox, setShowFilterBox] = useState(false)

  useEffect(() => {
    const fetchVenuesData = async () => {
      try {
        const fetchedVenues = await fetchVenues()
        setVenues(fetchedVenues)
        setFilteredVenues(fetchedVenues)
      } catch (error) {
        console.log("failed to fetch venues", error)
      }
    }
    fetchVenuesData()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption)
    applyFilters()
  }

  const handleFilterChange = (newFilterOptions) => {
    setFilterOptions(newFilterOptions)
    applyFilters()
  }

  const handleSearch = () => {
    applyFilters()
  }

  const toggleFilterBox = () => {
    setShowFilterBox(!showFilterBox)
  }

  const applyFilters = () => {
    let sorted = sortVenues(venues, sortOption)
    let filtered = filterVenues(sorted, searchTerm, filterOptions)
    setFilteredVenues(filtered)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        sortOption={sortOption}
        filterOptions={filterOptions}
        onSortFilterToggle={toggleFilterBox}
        onSearch={handleSearch}
        isSortFilterMenuOpen={showFilterBox}
      />
      <div className={classes.venuesContainer}>
        <div className="container col-md-8">
          <div className="justify-content-center d-flex">
            <h3 className="pt-4 text-center text-dark">Upcoming Events</h3>
          </div>
          <div className="row pt-3">
            
            {filteredVenues.map((venue) => (
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

export default Venues
