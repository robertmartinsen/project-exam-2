import React, { useState } from "react"
import { createVenue } from "../../services/venueService"
import classes from "../../styles/components/CreateVenueForm.module.scss"

const CreateVenueForm = () => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: "",
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  })

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

  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted", venueData)
    try {
      const createdVenue = await createVenue(venueData)
      setSuccessMessage(`Venue '${createdVenue.name}' created successfully! `)
    } catch (error) {

      console.error("Error creating venue:", error)
      setSuccessMessage("") 
    }
  }

  return (
    <div className="container">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-md-6 col-12 mb-3">
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

            <label className="justify-content-start d-flex mt-3">Media</label>
            <input
              type="text"
              name="media"
              value={venueData.media}
              onChange={handleChange}
              placeholder="Media URL (Optional)"
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">
              Price (Required)
            </label>
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
              Max Guests (Required)
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
            <label className="justify-content-start d-flex mt-3">
              Rating (Optional)
            </label>
            <input
              type="number"
              name="rating"
              value={venueData.rating}
              onChange={handleChange}
              placeholder="Rating (Optional)"
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">Options</label>
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
          </div>

          <div className="d-md-none d-block my-3">
            <button
              type="button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="btn btn-primary w-100 text-white"
            >
              {showMoreOptions ? "Less Options" : "More Options"}
            </button>
          </div>
        </div>

        <div
          className={`col-md-6 col-12 mb-3 ${
            showMoreOptions ? "" : "d-none d-md-block t"
          }`}
        >
          <div className="form-group text-center">
            <label className="justify-content-start d-flex mt-3">Address</label>
            <input
              type="text"
              name="address"
              value={venueData.location.address}
              onChange={handleChange}
              placeholder="Address (Optional)"
              className="form-control my-2"
            />
            <label className="justify-content-start d-flex mt-3">City</label>
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
            <label className="justify-content-start d-flex mt-3">Country</label>
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
              Latitude (Optional)
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
              Longitude (Optional)
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
        </div>

        <div className="col-12 text-center mt-3 mb-5">
          <button type="submit" className="btn text-white btn-secondary">
            Create Venue
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateVenueForm
