import React, { useState } from "react"
import {
  Form,
  Button,
  Alert,
  InputGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import classes from "./Auth.module.scss"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const [venueManager, setVenueManager] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    const emailRegex = /@stud\.noroff\.no$/

    if (form.checkValidity() === true && emailRegex.test(email)) {
      setError("")
      console.log("Registration successful with email:", email)
    } else {
      setError("Please use your Noroff student email to log in.")
    }

    setValidated(true)
  }

  return (
    <div className={classes.authBody}>
      <div className="container">
        <div className={`container col-md-6 p-3 bg-light ${classes.card}`}>
          <h1 className="text-dark text-center fs-2">
            Create an account with <span className="text-dark">V</span>
            <span className="text-primary">enues</span>
            <span className="text-dark">F</span>
            <span className="text-primary">or</span>
            <span className="text-dark">Y</span>
            <span className="text-primary">ou</span>
          </h1>
          <hr />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid Noroff student email address.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Are you a venue manager?
              </Form.Label>
              <div className="d-flex">
                <ToggleButtonGroup
                  type="radio"
                  name="venueManager"
                  value={venueManager}
                >
                  <ToggleButton
                    id="venueManager-yes"
                    variant={venueManager ? "primary" : "outline-primary"}
                    value={true}
                    onChange={(e) => setVenueManager(true)}
                  >
                    Yes
                  </ToggleButton>
                  <ToggleButton
                    id="venueManager-no"
                    variant={!venueManager ? "primary" : "outline-primary"}
                    value={false}
                    onChange={(e) => setVenueManager(false)}
                  >
                    No
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Form.Group>

            <span>
              Already have an account?{" "}
              <NavLink to="/Login" className={classes.register}>
                Click here.
              </NavLink>
            </span>
            <div className="d-flex justify-content-end pt-2">
              <Button className="text-white" variant="primary" type="submit">
                Create Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
