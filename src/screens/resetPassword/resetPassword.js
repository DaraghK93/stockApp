/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { APIName } from '../../constants/APIConstants';

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer';

function ResetPage() {
  // constant password holds the value of the input password
  const [password, setPassword] = useState('');
  // constant confrimPassword holds the value of the new password confirmed
  const [confirmPassword, setConfirmPassword] = useState('');
  // constant token holds the reset password token used to verify that the password can be changed
  const [token, setToken] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  // add state for passwordChange
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  /// Redux ///
  // const user = useSelector((state) => state.user);
  // const { loading, error } = user;

  // this function will allow the user to use the reset function from the userActions.js file
  // Password check functions taken from registration page to ensure consistency
  function handleSubmit(event) {
    event.preventDefault();
    setPasswordErrorMessage(null);
    // Check whether password and confirm password are the same. More messages will need to be added.
    if (password !== confirmPassword) {
      setPasswordErrorMessage(
        'Password and Confirm Password must be the same!'
      );
    }
    // Checks if the password is less than 8 characters. Gives a popup warning if it is.
    else if (password.length < 8) {
      setPasswordErrorMessage('Password must be at least 8 characters!');
    }
    // Checks if the password contains a lower case character (a-z).
    else if (!/[a-z]/.test(password)) {
      setPasswordErrorMessage(
        'Password must contain at least one lower case English character (a-z)!'
      );
    }
    // Checks if the password contains an upper case character (A-Z).
    else if (!/[A-Z]/.test(password)) {
      setPasswordErrorMessage(
        'Password must contain at least one upper case English character (A-Z)!'
      );
    }
    // Checks if the password contains number (0-9).
    else if (!/[0-9]/.test(password)) {
      setPasswordErrorMessage(
        'Password must contain at least one number (0-9)!'
      );
    }
    resetPassword();
  }

  const resetPassword = async () => {
    try {
      setLoading(true);
      // Configure the HTTP request
      let path = `/api/auth/reset/${token}`;
      let requestConfig = {
        body: {
          password: password,
        },
      };
      // Sent the request to backend
      const data = await API.post(APIName, path, requestConfig);
      setPasswordChanged(true);
      setLoading(false);
      console.log('data = ' + data);
      console.log(data.errormessage);
    } catch (error) {
      setPasswordErrorMessage(error.response.data.errormessage);
    }
  };

  useEffect(() => {
    /// getStockInfo ///
    // Description:
    //  Makes a GET request to the backend route /stock/:symbol
    const getToken = async () => {
      try {
        // get the symbol from the url string, use regex to extract capital letters only
        const token = window.location.pathname.replace(/\/auth\/+reset\//g, '');
        // Set the state for the token and loading to false
        setToken(token);
      } catch (error) {
        // Log the error
        console.log(error);
      }
    };
    getToken();
  }, []);

  //
  return (
    <FormContainer>
      {passwordErrorMessage && (
        <MessageAlert variant='danger'>{passwordErrorMessage}</MessageAlert>
      )}
      {passwordChanged && (
        <MessageAlert variant='success'>
          {<a href='/login'>Success Login here!</a>}
        </MessageAlert>
      )}
      {loading && <LoadingSpinner />}
      <h1>Reset Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='py-2' controlId='password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='py-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col className='text-center py-4'>
            <Button variant='primary' type='submit'>
              Reset Password
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}
export default ResetPage;
