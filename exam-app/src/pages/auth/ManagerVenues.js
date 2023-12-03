import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchVenuesByProfile, deleteVenue } from "../../services/api/venuebyid"
import EditVenueForm from "../../components/EditVenueForm"
import classes from "../../styles/pages/auth/ManagerVenues.module.scss"

function ManagerVenues() {
  const [venues, setVenues] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true)
      try {
        const profileName = "ProfileName"
        const fetchedVenues = await fetchVenuesByProfile(profileName)
        setVenues(fetchedVenues)
      } catch (error) {
        console.error("Error fetching venues:", error)
      }
      setIsLoading(false)
    }
    fetchVenues()
  }, [])

  const handleDeleteClick = (venue) => {
    setSelectedVenue(venue)
    setShowConfirm(true)
  }

  const handleEditClick = (venue) => {
    setSelectedVenue(venue)
    setShowEditForm(true)
  }

  const closeEditForm = () => {
    setShowEditForm(false)
    setSelectedVenue(null)
  }

  const confirmDeletion = async () => {
    if (selectedVenue) {
      try {
        await deleteVenue(selectedVenue.id)
        setVenues(venues.filter((v) => v.id !== selectedVenue.id))
        setShowConfirm(false)
      } catch (error) {
        console.error("Error deleting venue:", error)
      }
    }
  }

  if (isLoading) {
    return <div>Loading venues...</div>
  }

  if (!venues.length) {
    return (
      <div>
        <div className="pt-4">
          <h1 className="text-center">My Venues</h1>
        </div>
        <div className="container col-lg-8 pt-4 ">
          <h2 className="fs-3">My created Venues</h2>
          <hr />
          <p>Looks like you haven't created a venue yet...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="pt-4">
        <h1 className="text-center">My Venues</h1>
      </div>
      <div className="container col-lg-8 pt-4">
        <h2 className="fs-3">List of my Venues</h2>
        <hr />
        {venues.map((venue) => (
          <div key={venue.id} className={classes.venueInfoCard}>
            <div className="row pt-3">
              <div className="col">
                {venue.media && venue.media.length > 0 && (
                  <Link to={`/VenueById/${venue.id}`}>
                    <img
                      className={classes.venueMedia}
                      src={venue.media[0]}
                      alt={venue.name}
                    />
                  </Link>
                )}
              </div>
              <div className="col">
                <Link
                  className={classes.venueTitle}
                  to={`/VenueById/${venue.id}`}
                >
                  <p className="fw-bold text-center text-dark">{venue.name}</p>
                </Link>
                <p className="text-center">{venue.description}</p>
              </div>
              <div className="col">
                <div className="d-flex flex-column align-items-end">
                  <button
                    className={classes.editBtn}
                    onClick={() => handleEditClick(venue)}
                  >
                    Edit
                  </button>
                  <button
                    className={`mt-2 ${classes.deleteBtn}`}
                    onClick={() => handleDeleteClick(venue)}
                  >
                    Delete
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
            Are you sure you want to delete{" "}
            <span className="fw-bold">{selectedVenue?.name}</span>?
          </p>
          <div className="justify-content-center d-flex row">
            <button className={classes.yesBtn} onClick={confirmDeletion}>
              Yes
            </button>
            <button
              className={classes.noBtn}
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      {showEditForm && selectedVenue && (
        <EditVenueForm
          venueData={selectedVenue}
          setVenueData={setSelectedVenue}
          onClose={closeEditForm}
        />
      )}
    </div>
  )
}

export default ManagerVenues
