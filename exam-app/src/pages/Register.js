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
import classes from "../styles/components/Auth.module.scss"
import { registerUser } from "../services/authService"
import { useNavigate } from "react-router-dom"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const [venueManager, setVenueManager] = useState(false)

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const validateName = (name) => /^[A-Za-z0-9_]+$/.test(name)
  const validateEmail = (email) => /@stud\.noroff\.no$|@noroff\.no$/.test(email)
  const validatePassword = (password) => password.length >= 8

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    setNameError("")
    setEmailError("")
    setPasswordError("")

    if (!validateName(name)) {
      setNameError("Name can only contain letters, numbers, and underscores.")
      setValidated(false)
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid Noroff email address.")
      setValidated(false)
      return
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.")
      setValidated(false)
      return
    }

    try {
      const userData = {
        name,
        email,
        password,
        venueManager,
      }
      const response = await registerUser(userData)
      console.log("Registration successful", response)
      navigate("/Login")
    } catch (error) {
      console.error("Registration failed:", error)
      setError("Registration failed: " + error.message)
    }

    setValidated(true)
  }

  return (
    <div className={classes.authBody}>
      <div className="container">
        <div className={`container col-md-6 p-3 bg-light ${classes.card}`}>
          <h1 className="text-dark text-center fs-2">
            Create an account with <span className="text-dark">Holi</span>
            <span className="text-secondary">daze</span>
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
              {nameError && <Alert variant="danger">{nameError}</Alert>}
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
              {emailError && <Alert variant="danger">{emailError}</Alert>}
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
                  autoComplete="current-password"
                />
                <Form.Control.Feedback type="invalid">
                  Password is required.
                </Form.Control.Feedback>
              </InputGroup>
              {passwordError && <Alert variant="danger">{passwordError}</Alert>}
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
