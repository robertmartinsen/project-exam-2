import { VENUES_URL } from "./endpoints"

export const fetchVenues = async () => {
  try {
    const response = await fetch(VENUES_URL)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch venues:", error)
    throw error
  }
}

export default fetchVenues

export const createVenue = async (venueData) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(VENUES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      console.error("Error response:", errorResponse)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating avatar:", error)
    throw error
  }
}

