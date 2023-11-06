import React from "react";
import classes from "./footer.module.scss";

function Footer() {
  return (
    <footer className={`${classes.footer} text-light text-center py-3`}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} eDay. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;