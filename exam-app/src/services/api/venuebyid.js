import { VENUES_URL, PROFILE_URL } from "./endpoints"

export const fetchVenueById = async (venueId) => {
  try {
    const response = await fetch(`${VENUES_URL}/${venueId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch venue details")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching venue by ID:", error)
    throw error
  }
}

export const fetchVenuesByProfile = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token found")
    }

    const userProfile = JSON.parse(localStorage.getItem("user"))
    if (!userProfile || !userProfile.name) {
      throw new Error("User profile name not found")
    }

    const url = `${PROFILE_URL}${userProfile.name}/venues`
    console.log(`Fetching venues from: ${url}`)

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error data:", errorData)
      throw new Error(`Error fetching venues: ${errorData.message}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchVenuesByProfile:", error)
    throw error
  }
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

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error data:", errorData)
      throw new Error(`Error deleting venue: ${errorData.message}`)
    }

    if (response.status !== 204) {
      return response.json()
    }
  } catch (error) {
    console.error("Error deleting venue:", error)
    throw error
  }
}

export const updateVenue = async (venueId, venueData) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${VENUES_URL}/${venueId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error data:", errorData)
      throw new Error(`Error updating venue: ${errorData.message}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating venue:", error)
    throw error
  }
}
