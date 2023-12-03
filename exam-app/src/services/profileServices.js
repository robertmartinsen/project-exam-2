import { PROFILE_URL } from "./api/endpoints"

export const updateAvatar = async (userName, avatarUrl) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${PROFILE_URL}${userName}/media`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: avatarUrl }),
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
