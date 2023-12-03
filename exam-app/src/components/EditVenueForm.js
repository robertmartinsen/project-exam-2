import React, { useState } from "react"
import { updateVenue } from "../services/api/venuebyid"
import classes from "../styles/pages/auth/ManagerVenues.module.scss"

const EditVenueForm = ({ venueData, setVenueData, onClose }) => {
  const [successMessage, setSuccessMessage] = useState("")
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "media") {
      setVenueData({ ...venueData, [name]: [value] })
    } else if (name in venueData.meta) {
      setVenueData({
        ...venueData,
        meta: { ...venueData.meta, [name]: checked },
      })
    } else if (name in venueData.location) {
      setVenueData({
        ...venueData,
        location: { ...venueData.location, [name]: value },
      })
    } else {
      setVenueData({
        ...venueData,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedVenue = await updateVenue(venueData.id, venueData)
      setSuccessMessage(`Venue '${updatedVenue.name}' updated successfully!`)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Error updating venue:", error)
      setSuccessMessage("")
    }
  }

  return (
    <div className={`container col-md-6 ${classes.editPopup}`}>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <h2 className="text-center">Edit {venueData.name}</h2>
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-12 mb-3">
          <div className="form-group text-center">
            <label className="justify-content-start d-flex mt-3">
              Venue Name
            </label>
            <input
              type="text"
              name="name"
              value={venueData.name}
              onChange={handleChange}
              placeholder="Venue Name (Required)"
              required
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">
              Description
            </label>
            <textarea
              name="description"
              value={venueData.description}
              onChange={handleChange}
              placeholder="Description (Required)"
              required
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">
              Media URL
            </label>
            <input
              type="text"
              name="media"
              value={venueData.media}
              onChange={handleChange}
              placeholder="Media URL (Optional)"
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">Price</label>
            <input
              type="number"
              name="price"
              value={venueData.price}
              onChange={handleChange}
              placeholder="Price (Required)"
              required
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">
              Max Guests
            </label>
            <input
              type="number"
              name="maxGuests"
              value={venueData.maxGuests}
              onChange={handleChange}
              placeholder="Max Guests (Required)"
              required
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">Rating</label>
            <input
              type="number"
              name="rating"
              value={venueData.rating}
              onChange={handleChange}
              placeholder="Rating (Optional)"
              className="form-control my-2"
            />
            <div className={`mt-2 ${classes.checkbox}`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={venueData.meta.wifi}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">WiFi</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="parking"
                  checked={venueData.meta.parking}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">Parking</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={venueData.meta.breakfast}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">Breakfast</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="pets"
                  checked={venueData.meta.pets}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">Pets</label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="btn btn-primary w-100 text-white my-3"
            >
              {showMoreOptions ? "Less Options" : "More Options"}
            </button>

            {showMoreOptions && (
              <div>
                <label className="justify-content-start d-flex mt-3">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={venueData.location.address}
                  onChange={handleChange}
                  placeholder="Address (Optional)"
                  className="form-control my-2"
                />
                <label className="justify-content-start d-flex mt-3">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={venueData.location.city}
                  onChange={handleChange}
                  placeholder="City (Optional)"
                  className="form-control my-2"
                />
                <label className="justify-content-start d-flex mt-3">Zip</label>
                <input
                  type="text"
                  name="zip"
                  value={venueData.location.zip}
                  onChange={handleChange}
                  placeholder="Zip (Optional)"
                  className="form-control my-2"
                />
                <label className="justify-content-start d-flex mt-3">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={venueData.location.country}
                  onChange={handleChange}
                  placeholder="Country (Optional)"
                  className="form-control my-2"
                />
                <label className="justify-content-start d-flex mt-3">
                  Continent
                </label>
                <input
                  type="text"
                  name="continent"
                  value={venueData.location.continent}
                  onChange={handleChange}
                  placeholder="Continent (Optional)"
                  className="form-control my-2"
                />
                <label className="justify-content-start d-flex mt-3">
                  Latitude
                </label>
                <input
                  type="number"
                  name="lat"
                  value={venueData.location.lat}
                  onChange={handleChange}
                  placeholder="Latitude (Optional)"
                  className="form-control my-2"
                />
                <label className="justify-content-start d-flex mt-3">
                  Longitude
                </label>
                <input
                  type="number"
                  name="lng"
                  value={venueData.location.lng}
                  onChange={handleChange}
                  placeholder="Longitude (Optional)"
                  className="form-control my-2"
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-12 text-center mt-3 mb-5">
          <div>
            <button type="submit" className="btn text-white btn-primary mr-2">
              Update
            </button>
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="btn text-light btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditVenueForm
