import React, { useState } from "react"
import { Form, Button, Alert, InputGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import classes from "../styles/components/Auth.module.scss"
import { loginUser } from "../services/api/auth"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../utilities/UserContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const emailRegex = /@stud\.noroff\.no$/

    if (!emailRegex.test(email)) {
      setError("Please use your Noroff email to log in.")
      return
    }

    try {
      const response = await loginUser({ email, password })
      console.log("Login successful", response)

      const userData = {
        name: response.name,
        email: response.email,
        avatar: response.avatar,
        venueManager: response.venueManager,
      }

      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)

      navigate("/")
    } catch (error) {
      console.error("Login failed:", error)
      setError("Login failed: " + error.message)
    }

    setValidated(true)
  }

  return (
    <div className={classes.authBody}>
      <div className="container">
        <div className={`container col-md-6 p-3 bg-light ${classes.card}`}>
          <h1 className="text-dark text-center">
            Log in to <span className="text-dark">Holi</span>
            <span className="text-secondary">daze</span>
          </h1>
          <hr />
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="pt-3">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                    Please enter a valid email address.
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
              <span>
                Don't have an account?{" "}
                <NavLink to="/Register" className={classes.register}>
                  Click here to register.
                </NavLink>
              </span>
              <div className="d-flex justify-content-end pt-2">
                <Button className="text-white" variant="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
