/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { APIName } from '../../constants/APIConstants';

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer';

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';

function RequestResetPassword() {
  // constant token holds the reset password token used to verify that the password can be changed
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState('');

  // this function will allow the user to use the reset function from the userActions.js file
  // Password check functions taken from registration page to ensure consistency
  const handleSubmit = async (event) => {
    setEmailErrorMessage(false);
    setEmailSent(false);
    event.preventDefault();
    await requestResetPassword();
  };

  const requestResetPassword = async () => {
    try {
      setLoading(true);
      // Configure the HTTP request
      let path = `/api/auth/recover`;
      let requestConfig = {
        body: {
          email: email,
        },
      };
      // Sent the request to backend
      const data = await API.post(APIName, path, requestConfig);
      setLoading(false);
      setEmailSent(true);
      setEmailSentMessage(data.message);
      return data;
    } catch (error) {
      setEmailErrorMessage(error.response.data.errormessage);
      setLoading(false);
    }
  };

  //
  return (
    <FormContainer>
      {emailErrorMessage && (
        <MessageAlert variant='danger'>{emailErrorMessage}</MessageAlert>
      )}
      {emailSent && (
        <MessageAlert variant='success'>{emailSentMessage}</MessageAlert>
      )}
      {loading && <LoadingSpinner />}
      <h1>Reset Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='py-2' controlId='password'>
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col className='text-center py-4'>
            <Button variant='primary' type='submit'>
              Submit email
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}
export default RequestResetPassword;
