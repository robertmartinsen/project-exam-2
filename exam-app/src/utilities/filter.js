export const filterVenues = (venues, searchTerm, filterOptions) => {
  let filtered = venues.filter(
    (venue) => venue.media.length > 0 && venue.name && venue.price
  )

  if (searchTerm) {
    filtered = filtered.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  Object.entries(filterOptions).forEach(([key, value]) => {
    if (value) {
      filtered = filtered.filter((venue) => venue.meta[key])
    }
  })

  return filtered
}
