import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../utilities/UserContext"
import { logout } from "../../services/logout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import classes from "../../styles/pages/auth/UserProfile.module.scss"

function UserProfile() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout(setUser, navigate)
  }

  return (
    <div className="pt-4">
      <div className="text-center">
        <h1>My Profile</h1>
      </div>
      <div>
        <div className="container col-md-4">
          <div className="row">
            <div className={` ${classes.profileImg}`}>
            <FontAwesomeIcon icon={faUser} />
            {user.avatar && <img src={user.avatar} alt="Profile Avatar" />}
            </div>
            <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="container col-md-4 pt-3">
          <button>Edit Profile</button>
        </div>
        <div className="container col-md-4 pt-3">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
