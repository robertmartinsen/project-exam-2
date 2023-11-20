import { REGISTER_URL, LOGIN_URL } from "./endpoints"

export const registerUser = async (userData) => {
  const response = await fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || null,
      venueManager: userData.venueManager,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Could not register user.');
  }

  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Could not log in.")
  }

  return await response.json()
}
