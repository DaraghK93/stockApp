/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert'
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner'

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer'
import QuantitySelect from '../../components/confirmOrderComponents/QuantitySelect'

function LoginPage() {
  // constant email holds the value of the input email address
  const [email, setEmail] = useState('')
  // constant password holds the value of the input password
  const [password, setPassword] = useState('')

  // navigate allows the page to redirected to another page
  const navigate = useNavigate()

  /// Redux ///
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { loading, error, userInfo } = user

  // this function will allow the user to use the login function from the userActions.js file
  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login(email, password))
  }

  /// useEffect ///
  // Check if user is logged in then redirect to stockdiscoveery page
  useEffect(() => {
    if (userInfo) {
      navigate('/stockdiscovery')
    }
  }, [userInfo, navigate])

  //
  //
  return (
    <FormContainer>
      {error && <MessageAlert variant="danger">{error}</MessageAlert>}
      {loading && <LoadingSpinner />}
<QuantitySelect />

      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="py-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="py-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Row>
          <Col className="text-center py-4">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}
export default LoginPage
