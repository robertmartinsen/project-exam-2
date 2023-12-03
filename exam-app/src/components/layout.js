import React from "react"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import "../styles/components/layout.scss"

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
