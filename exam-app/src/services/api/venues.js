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
