import { BOOKINGS_URL } from "./endpoints"
import { VENUES_URL } from "./endpoints"

export const fetchBookings = async (venueId, token) => {
  try {
    if (!token) {
      throw new Error("No token found")
    }

    const url = `${VENUES_URL}?venueId=${venueId}&_bookings=true`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Error fetching bookings: ${errorBody.message}`)
    }

    const bookingsData = await response.json()
    return bookingsData
  } catch (error) {
    console.error("Error in fetchBookings:", error)
    throw error
  }
}

export const fetchBookingById = async (bookingId, token) => {
  try {
    const response = await fetch(`${BOOKINGS_URL}/${bookingId}?_venue=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch booking")
    }
    return await response.json()
  } catch (error) {
    console.error("Error in fetchBookingById:", error)
    throw error
  }
}

export const createBooking = async (bookingData, token) => {
  try {
    const response = await fetch(BOOKINGS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error creating booking: ${errorData.message}`)
    }

    const bookingResponse = await response.json()
    console.log("API Response:", bookingResponse)
    return bookingResponse
  } catch (error) {
    console.error("Error in createBooking:", error)
    throw error
  }
}

export const cancelBooking = async (bookingId, token) => {
  const response = await fetch(`${BOOKINGS_URL}/${bookingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorResponse = await response.json()
    throw new Error(`Error cancelling booking: ${errorResponse.message}`)
  }
  return response.status === 204 ? {} : response.json()
}


export const fetchVenueWithBookings = async (venueId, token) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const url = `https://api.noroff.dev/api/v1/holidaze/venues?venueId=${venueId}&_bookings=true`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Error fetching venue with bookings: ${errorBody.message}`);
    }

    const venueData = await response.json();
    return venueData[0]; // Assuming the API returns an array with a single venue
  } catch (error) {
    console.error("Error in fetchVenueWithBookings:", error);
    throw error;
  }
};