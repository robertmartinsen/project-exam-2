import React from "react"
import classes from "../styles/components/footer.module.scss"

function Footer() {
  return (
    <footer className={`${classes.footer} text-light text-center py-3`}>
      <div className="container text-center">
        <p>
          &copy; {new Date().getFullYear()} Holi
          <span className="text-secondary">daze</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
