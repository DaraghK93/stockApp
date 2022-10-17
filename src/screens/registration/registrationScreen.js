/// Registration Screen ///
// Route:
//  <URL>/register
// Description:
//  This screen contains the components rendered to the user when they are registering to use the site.

import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// The below three imports are used for the dropdown menu for location. react-bootstrap-country-select
// was installed for this.
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css'

/// Widgets ///
// Message alert. Will need to add more message alerts.
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert'

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer'

//// Redux ////
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../actions/userActions'

// Loading Spinner
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner'

function RegistrationPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [overEighteen, setoverEighteen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  /// Redux ///
  const dispatch = useDispatch()
  /// Need loading and error from registration
  const userRegistration = useSelector((state) => state.userRegistration)
  const { loading, error } = userRegistration
  const user = useSelector((state) => state.user)
  const { userInfo } = user

  function handleSubmit(event) {
    event.preventDefault()
    // Check whether password and confirm password are the same. More messages will need to be added.
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password must be the same!')
    } else {
      // location returns a dictionary of items such as country ID and name, but we only want name here.
      dispatch(
        registerUser(
          firstName,
          lastName,
          email,
          username,
          password,
          overEighteen,
        ),
      )
    }
  }

  // Redirect if the user is logged in (stock disovery for now will change to profile later)
  useEffect(() => {
    if (userInfo) {
      navigate('/stockdiscovery')
    }
  }, [userInfo, navigate])

  return (
    <FormContainer>
      <h1>Register</h1>
      {errorMessage && (
        <MessageAlert variant="danger">{errorMessage}</MessageAlert>
      )}
      {error && <MessageAlert variant="danger">{error}</MessageAlert>}
      {loading && <LoadingSpinner />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="py-2" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="py-2" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="py-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="py-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="py-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="py-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}
            required
          />
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Check
            type="checkbox"
            id="over-eighteen-checkbox"
            label="By ticking this box I certify that I am over 18 years of age."
            required
            onChange={(e) => {
              setoverEighteen(e.target.checked)
            }}
          />
        </Form.Group>
        <Row>
          <Col className="text-center py-4">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegistrationPage
