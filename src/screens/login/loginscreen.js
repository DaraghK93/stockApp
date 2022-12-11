import "../../scss/global_variables.scss";

/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert'
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner'

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer'

function LoginPage() {
  // constant email holds the value of the input email address
  const [email, setEmail] = useState('')
  // constant password holds the value of the input password
  const [password, setPassword] = useState('')

  /// Redux ///
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { loading, error } = user

  // this function will allow the user to use the login function from the userActions.js file
  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    dispatch({
      type: 'RESET_ERROR',
      payload: null,
    });
    return () => {};
  }, []);

  //
  return (
    <FormContainer>
      {error && <MessageAlert variant="danger">{error}</MessageAlert>}
      {loading && <LoadingSpinner />}
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
          <Col className="text-center py-2">
            <a href="/auth/recover" style={{color:'#006195'}}>Forgot password?</a>
          </Col>
          <Col className="text-center py-2">
            <a href="/register" style={{color:'#006195'}}>Create account</a>
          </Col>
        </Row>
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
