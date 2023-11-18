export const sortVenues = (venues, sortOption) => {
  if (sortOption === "newest") {
    return [...venues].sort((a, b) => new Date(b.created) - new Date(a.created))
  } else if (sortOption === "oldest") {
    return [...venues].sort((a, b) => new Date(a.created) - new Date(b.created))
  } else if (sortOption === "relevant") {
    return [...venues].sort((a, b) => b.rating - a.rating)
  }
  return venues
}
