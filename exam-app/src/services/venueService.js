import { apiRequest } from "../api/apiUtils"
import { VENUES_URL, PROFILE_URL } from "./endpoints"

export const fetchVenueById = async (venueId) => {
  const url = `${VENUES_URL}/${venueId}`
  return apiRequest(url)
}

export const fetchVenuesByProfile = async () => {
  const userProfile = JSON.parse(localStorage.getItem("user"))
  if (!userProfile || !userProfile.name) {
    console.error("User profile or name is missing")
    return
  }
  const url = `${PROFILE_URL}${userProfile.name}/venues`
  return apiRequest(url)
}

export const deleteVenue = async (venueId) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token found")
    }

    const response = await fetch(`${VENUES_URL}/${venueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 204) {
      return "Venue deleted successfully"
    } else if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error deleting venue: ${errorData.message}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error deleting venue:", error)
    throw error
  }
}

export const updateVenue = async (venueId, venueData) => {
  const url = `${VENUES_URL}/${venueId}`
  return apiRequest(url, "PUT", venueData)
}

export const fetchVenues = async () => {
  return apiRequest(VENUES_URL, "GET", null, false)
}

export const createVenue = async (venueData) => {
  return apiRequest(VENUES_URL, "POST", venueData)
}
