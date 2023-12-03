import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../utilities/UserContext"
import { logout } from "../services/logout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import classes from "../styles/components/ProfileCard.module.scss"
import EditAvatarForm from "./EditAvatar"

function ProfileCard() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [isEditVisible, setIsEditVisible] = useState(false)

  const toggleEditForm = () => {
    setIsEditVisible(!isEditVisible)
  }

  const handleSignOut = () => {
    logout(setUser, navigate)
  }

  return (
    <div className="pt-3 container">
      <div className={`container col-md-6 col-lg-5 ${classes.profileBox}`}>
        <div className="row align-items-center justify-content-center">
          <div
            className={`p-2 col-md-5 col-lg-4 rounded-circle ${classes.avatarContainer}`}
          >
            {!user.avatar ? (
              <FontAwesomeIcon
                className={` rounded-circle ${classes.defaultAvatar}`}
                icon={faUser}
              />
            ) : (
              <img
                className={`rounded-circle ${classes.avatar}`}
                src={user.avatar}
                alt="Profile Avatar"
              />
            )}
          </div>
          <div className="col-md-8">
            <h2 className="text-center text-light">@{user.name}</h2>
            <p className="text-center text-light">{user.email}</p>
            <hr className="container col-md-8 align-items-center" />
            <div className="pt-3 d-flex justify-content-center">
              <button
                className={`me-3 ${classes.editProfileBtn}`}
                onClick={toggleEditForm}
              >
                Edit Profile
              </button>
              <button className={classes.signoutBtn} onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
          <div className="pt-3 d-flex justify-content-center">
            {isEditVisible && (
              <EditAvatarForm
                userName={user.name}
                token={user.token}
                setUser={setUser}
                setEditMode={setIsEditVisible}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
