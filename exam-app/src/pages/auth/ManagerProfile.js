import React from "react"
import ProfileCard from "../../components/User/ProfileCard"
import CreateVenueForm from "../../components/Venue/CreateVenueForm"

function ManagerProfile() {
  return (
    <div className="pt-4">
      <div className="text-center">
        <h1>Venue Manager Profile</h1>
      </div>
      <ProfileCard />
      <div className="col-md-8 container pt-5">
        <h2>Create a Venue</h2>
        <hr />
        <CreateVenueForm />
      </div>
    </div>
  )
}

export default ManagerProfile
