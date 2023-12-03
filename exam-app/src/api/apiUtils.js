const getHeaders = (tokenRequired = true) => {
  const headers = {
    "Content-Type": "application/json",
  }
  if (tokenRequired) {
    const token = localStorage.getItem("token")
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }
  return headers
}

export const apiRequest = async (
  url,
  method = "GET",
  body = null,
  tokenRequired = true
) => {
  const options = {
    method,
    headers: getHeaders(tokenRequired),
    body: body ? JSON.stringify(body) : null,
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(
      errorBody.message || "An error occurred during the API request."
    )
  }

  return response.json()
}
