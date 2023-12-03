import React from "react"
import NavBar from "./navbar"
import Footer from "./footer"
import { Outlet } from "react-router-dom"
import "../styles/components/layout.scss"

function Layout (){
  
  return (
    <div className="layout-container">
      <NavBar />
      <div className="layout-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout