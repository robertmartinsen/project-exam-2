import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/Home"
import Venues from "./pages/Venues"
import VenueById from "./pages/VenueById"
import Contact from "./pages/Contact"
import MyBookings from "./pages/MyBookings"
import RouteNotFound from "./pages/RouteNotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ManagerProfile from "./pages/auth/ManagerProfile"
import UserProfile from "./pages/auth/UserProfile"
import { UserProvider } from "./utilities/UserContext"
import BookingConfirmation from "./pages/auth/BookingConfirmation"
import UserBookings from "./pages/auth/UserBookings"
import ManagerBookings from "./pages/auth/ManagerVenues"
import store from "./store"
import { Provider as ReduxProvider } from "react-redux"

function App() {
  return (
    <ReduxProvider store={store}>
      <UserProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="Venues" element={<Venues />} />
              <Route path="VenueById/:venueId" element={<VenueById />} />
              <Route path="Contact" element={<Contact />} />
              <Route path="MyBookings" element={<MyBookings />} />
              <Route path="Login" element={<Login />} />
              <Route path="Register" element={<Register />} />
              <Route path="/ManagerProfile" element={<ManagerProfile />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route
                path="/BookingConfirmation/:venueId"
                element={<BookingConfirmation />}
              />
              <Route path="/UserBookings" element={<UserBookings />} />
              <Route path="/ManagerBookings" element={<ManagerBookings />} />
              <Route path="*" element={<RouteNotFound />} />
            </Route>
          </Routes>
        </div>
      </UserProvider>
    </ReduxProvider>
  )
}

export default App
