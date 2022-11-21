/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { ToggleButton, Image } from 'react-bootstrap';

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer';

import { API } from 'aws-amplify';
import { APIName } from '../../constants/APIConstants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function UserSettingsPage() {
  // constant password holds the value of the input password
  const [password, setPassword] = useState('');
  const [currPasswordEnteredError, setCurrPasswordEnteredError] =
    useState(false);
  // new passwords
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  // add state for passwordChange
  const [loading, setLoading] = useState(false);

  const [gameImage, setGameImage] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const [username, setUsername] = useState('');

  //Redux
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const userToken = userInfo.token;

  var images = [
    '/stock_photo_1.jpg',
    '/stock_photo_2.jpg',
    '/stock_photo_3.jpg',
    '/stock_photo_4.jpg',
  ];

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (password) {
      // determine if password is to be changed
      if (newPassword) {
        // Check whether password and confirm password are the same. More messages will need to be added.
        if (newPassword !== confirmNewPassword) {
          setPasswordErrorMessage(
            'Password and Confirm Password must be the same!'
          );
        }
        // Checks if the password is less than 8 characters. Gives a popup warning if it is.
        else if (newPassword.length < 8) {
          setPasswordErrorMessage('Password must be at least 8 characters!');
        }
        // Checks if the password contains a lower case character (a-z).
        else if (!/[a-z]/.test(newPassword)) {
          setPasswordErrorMessage(
            'Password must contain at least one lower case English character (a-z)!'
          );
        }
        // Checks if the password contains an upper case character (A-Z).
        else if (!/[A-Z]/.test(newPassword)) {
          setPasswordErrorMessage(
            'Password must contain at least one upper case English character (A-Z)!'
          );
        }
        // Checks if the password contains number (0-9).
        else if (!/[0-9]/.test(newPassword)) {
          setPasswordErrorMessage(
            'Password must contain at least one number (0-9)!'
          );
        } else {
          setPasswordErrorMessage('');
        }
      }
      setCurrPasswordEnteredError(false);
      if (passwordErrorMessage === null) {
        changeUserDetails();
      }
    } else {
      setCurrPasswordEnteredError(true);
    }
  }

  const changeUserDetails = async () => {
    try {
      console.log('hi');

      let body = {
        password: password,
        username: username ? username : undefined,
        newPassword: newPassword ? newPassword : undefined,
      };

      setCurrPasswordEnteredError(false);
      setLoading(true);
      // Configure the HTTP request
      let path = `/api/auth/changeuserdetails`;
      let requestConfig = {
        body,
        headers: { 'x-auth-token': userToken },
      };
      // Sent the request to backend
      const data = await API.post(APIName, path, requestConfig);
      setLoading(false);
      console.log('data = ' + data);
      console.log(data.errormessage);
    } catch (error) {
      setLoading(false);
      //setPasswordErrorMessage(error.response.data.errormessage);
    }
  };

  useEffect(() => {
    /// getStockInfo ///
    // Description:
    //  Makes a GET request to the backend route /stock/:symbol
    const getToken = async () => {
      try {
      } catch (error) {
        // Log the error
        console.log(error);
      }
    };
    getToken();
  }, []);

  //
  return (
    <>
      <FormContainer>
        <h1> Settings</h1>
        {currPasswordEnteredError && (
          <MessageAlert variant='danger'>
            {'Current password is required'}
          </MessageAlert>
        )}
        {loading && <LoadingSpinner />}
        <Form.Group className='py-2' controlId='oldPassword'>
          <Form.Label>Current Password* - required</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter current password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <p>Choose new avatar</p>
        <Row className='py-3' md={4} sm={2} xs={2}>
          {images.map((image, idx) => (
            <Col key={`col-image-${image}`}>
              <ToggleButton
                className='gameDetailsToggleButton'
                key={idx}
                style={{ border: 'none' }}
                id={`radio-${idx}`}
                variant={'outline-primary'}
                type='radio'
                name='radio'
                value={image}
                checked={gameImage === image}
                onChange={(e) => setGameImage(e.currentTarget.value)}
              >
                <Image thumbnail src={image} />
              </ToggleButton>
            </Col>
          ))}
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='py-2' controlId='username'>
            <Form.Label>New Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter New Username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          {passwordErrorMessage && (
            <MessageAlert variant='danger'>{passwordErrorMessage}</MessageAlert>
          )}
          <Form.Group className='py-2' controlId='newPassword'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder='Enter New Password'
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className='py-2' controlId='confirmNewPassword'>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder='Confirm New Password'
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </Form.Group>
          <Button onClick={togglePassword}>Show password</Button>
          <p style={{ fontSize: 12 }}>
            Passwords must be at least 8 characters long, contain at least one
            lower case character (a-z), one upper case character (A-Z) and one
            number [0-9]!
          </p>
          <Row>
            <Col className='text-center py-4'>
              <Button variant='primary' type='submit'>
                Confirm changes
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
}

export default UserSettingsPage;
