import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import MyBookings from "./pages/MyBookings"
import RouteNotFound from "./pages/RouteNotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="MyBookings" element={<MyBookings />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />}/>
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;