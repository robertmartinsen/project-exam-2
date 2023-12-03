import React, { createContext, useState, useEffect } from "react"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUserData = localStorage.getItem("user")
    if (savedUserData) {
      try {
        return JSON.parse(savedUserData)
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e)
        return null
      }
    }
    return null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
