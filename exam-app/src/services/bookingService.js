import { apiRequest } from '../api/apiUtils';
import { BOOKINGS_URL, VENUES_URL } from './endpoints';

export const fetchBookings = (venueId) => {
  const url = `${VENUES_URL}?venueId=${venueId}&_bookings=true`;
  return apiRequest(url);
};

export const fetchBookingById = (bookingId) => {
  const url = `${BOOKINGS_URL}/${bookingId}?_venue=true`;
  return apiRequest(url);
};

export const createBooking = (bookingData) => {
  return apiRequest(BOOKINGS_URL, 'POST', bookingData);
};

export const cancelBooking = (bookingId) => {
  const url = `${BOOKINGS_URL}/${bookingId}`;
  return apiRequest(url, 'DELETE');
};

export const fetchVenueWithBookings = (venueId) => {
  const url = `${VENUES_URL}?venueId=${venueId}&_bookings=true`;
  return apiRequest(url);
};
