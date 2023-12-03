import { createSlice } from "@reduxjs/toolkit"

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload)
    },
    setBookings: (state, action) => {
      state.bookings = action.payload
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      )
    },
  },
})

export const { addBooking, setBookings, removeBooking } = bookingsSlice.actions
export default bookingsSlice.reducer
