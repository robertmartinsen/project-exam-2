import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../utilities/UserContext"
import { logout } from "../../services/logout"

function ManagerProfile() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout(setUser, navigate)
  }

  return (
    <div>
      <h1>Manager Profile</h1>
      {/* Profile details here */}

      {/* Sign out button */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default ManagerProfile
