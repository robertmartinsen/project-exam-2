import React, { useState } from "react"
import { updateAvatar } from "../../services/profileService"
import classes from "../../styles/components/EditAvatar.module.scss"

const EditAvatarForm = ({ userName, token, setUser, setEditMode }) => {
  const [avatarUrl, setAvatarUrl] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const updatedAvatarResponse = await updateAvatar(
        userName,
        avatarUrl,
        token
      )
      const newAvatarUrl = updatedAvatarResponse.avatar
      setUser((prevUser) => ({
        ...prevUser,
        avatar: newAvatarUrl,
      }))
      setEditMode(false)
    } catch (error) {
      console.error("Failed to update avatar:", error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={classes.editForm}
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="Enter new avatar URL"
        />
        <button className={classes.confirmBtn} type="submit">
          Confirm
        </button>
      </form>
    </div>
  )
}

export default EditAvatarForm
