import React, { useState, useContext } from "react"
import classes from "../styles/components/navbar.module.scss"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../utilities/UserContext"

function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const { user } = useContext(UserContext)

  function toggleSidebar() {
    setShowSidebar(!showSidebar)
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${classes.nav}`}>
      <div className="container col-md-8">
        <a className="navbar-brand fs-4" href="/">
          <span className="text-light">Holi</span>
          <span className="text-secondary">daze</span>
        </a>

        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`sidebar offcanvas offcanvas-start ${
            showSidebar ? "show" : ""
          } ${classes["bg-blue"]}`}
          tabIndex="-1"
          id="offCanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header text-white border-bottom">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <span className="text-light">Holi</span>
              <span className="text-primary">daze</span>
            </h5>
            <button
              className="btn-close btn-close-white shadow-none"
              onClick={toggleSidebar}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-flex flex-column flex-lg-row p-4">
            <ul className="navbar-nav d-flex justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
              <li className="nav-item mx-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${classes.myNavLink} ${
                      isActive ? classes.activeNavLink : ""
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink
                  to="/Venues"
                  className={({ isActive }) =>
                    `${classes.myNavLink} ${
                      isActive ? classes.activeNavLink : ""
                    }`
                  }
                  end
                >
                  Venues
                </NavLink>
              </li>

              <li className="nav-item mx-2">
                <NavLink
                  to="/Contact"
                  className={({ isActive }) =>
                    `${classes.myNavLink} ${
                      isActive ? classes.activeNavLink : ""
                    }`
                  }
                  end
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item mx-2"></li>
            </ul>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 flex-lg mx-4">
              {user ? (
                <NavLink
                  to={user.venueManager ? "/ManagerBookings" : "/UserBookings"}
                  className={({ isActive }) =>
                    `${classes.icon} ${isActive ? classes.iconActive : ""} ${
                      showSidebar ? classes.iconPadding : ""
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faCalendarDays} className={`fs-4`} />
                </NavLink>
              ) : (
                <NavLink
                  to="/MyBookings"
                  className={({ isActive }) =>
                    `${classes.icon} ${isActive ? classes.iconActive : ""} ${
                      showSidebar ? classes.iconPadding : ""
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faCalendarDays} className={`fs-4`} />
                </NavLink>
              )}
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3 flex-lg mx-4">
              {user ? (
                user.venueManager ? (
                  <NavLink
                    to="/ManagerProfile"
                    className={({ isActive }) =>
                      `${classes.icon} ${isActive ? classes.iconActive : ""} ${
                        showSidebar ? classes.iconPadding : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faUser} className={`fs-4`} />
                  </NavLink>
                ) : (
                  <NavLink
                    to="/UserProfile"
                    className={({ isActive }) =>
                      `${classes.icon} ${isActive ? classes.iconActive : ""} ${
                        showSidebar ? classes.iconPadding : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faUser} className={`fs-4`} />
                  </NavLink>
                )
              ) : (
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    `${classes.icon} ${isActive ? classes.iconActive : ""} ${
                      showSidebar ? classes.iconPadding : ""
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faUser} className={`fs-4`} />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
