/// Registration Screen ///
// Route:
//  <URL>/register
// Description:
//  This screen contains the components rendered to the user when they are registering to use the site.

import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import InfoButtonHover from '../../components/widgets/InfoButtonHover/InfoButtonHover';

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
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)

  /// Redux ///
  const dispatch = useDispatch()
  /// Need loading and error from registration
  const userRegistration = useSelector((state) => state.userRegistration)
  const { loading, error } = userRegistration

  function handleSubmit(event) {
    event.preventDefault()
    // Check whether password and confirm password are the same. More messages will need to be added.
    if (password !== confirmPassword) {
      setPasswordErrorMessage('Password and Confirm Password must be the same!')
    } 
    // Checks if the password is less than 8 characters. Gives a popup warning if it is.
    else if (password.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 characters!')
    }
    // Checks if the password contains a lower case character (a-z).
    else if (!/[a-z]/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one lower case English character (a-z)!')
    }
    // Checks if the password contains an upper case character (A-Z).
    else if (!/[A-Z]/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one upper case English character (A-Z)!')
    }
    // Checks if the password contains number (0-9).
    else if (!/[0-9]/.test(password)) {
      setPasswordErrorMessage('Password must contain at least one number (0-9)!')
    }
    
    else {
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

  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <MessageAlert variant="danger">{error}</MessageAlert>}
      {loading && <LoadingSpinner />}
      <Form onSubmit={handleSubmit}>
        <br></br>
        <Row>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
        </Row>
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
          <InfoButtonHover title="Password Requirements" info={"Passwords must be at least 8 characters long, contain at least one lower case character (a-z), one upper case character (A-Z) and one number [0-9]!"} />
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
        {passwordErrorMessage && (
          <MessageAlert variant="danger">{passwordErrorMessage}</MessageAlert>
        )}
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
