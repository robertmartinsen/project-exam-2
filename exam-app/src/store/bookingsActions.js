import { BOOKINGSDETAIL_URL } from "../services/api/endpoints"
import { BOOKINGS_URL } from "../services/api/endpoints"

export const addBooking = (booking) => ({
  type: "ADD_BOOKING",
  payload: booking,
})

export const setBookings = (bookings) => ({
  type: "SET_BOOKINGS",
  payload: bookings,
})

export const removeBooking = (bookingId) => ({
  type: "REMOVE_BOOKING",
  payload: bookingId,
})

export const fetchBookings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("No token found")
    }

    const response = await fetch(`${BOOKINGSDETAIL_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Error fetching bookings: ${errorBody.message}`)
    }

    const bookings = await response.json()
    dispatch(setBookings(bookings))
  } catch (error) {
    console.error("Error in fetchBookings:", error)
  }
}

export const cancelBooking = (bookingId, token) => async (dispatch) => {
  try {
    const response = await fetch(`${BOOKINGS_URL}/${bookingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error cancelling booking: ${errorData.message}`)
    }

    dispatch(removeBooking(bookingId))
  } catch (error) {
    console.error("Error in cancelBooking:", error)
  }
}
