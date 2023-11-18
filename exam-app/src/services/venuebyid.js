import { VENUES_URL } from "./endpoints";

export const fetchVenueById = async (venueId) => {
    try {
      const response = await fetch(`${VENUES_URL}/${venueId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch venue details');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching venue by ID:', error);
    }
  };