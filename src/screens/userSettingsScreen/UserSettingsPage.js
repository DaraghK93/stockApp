/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import { ToggleButton, Image } from 'react-bootstrap';

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer';

import { API } from 'aws-amplify';
import { APIName } from '../../constants/APIConstants';

function UserSettingsPage() {
  // constant password holds the value of the input password
  const [password, setPassword] = useState('');
  const [currPasswordEnteredError, setCurrPasswordEnteredError] =
    useState(false);
  const [currPasswordErrorMessage, setCurrPasswordErrorMessage] = useState('');
  // new passwords
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  // add state for passwordChange
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('');

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState('');

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

  function handleSubmit(event) {
    event.preventDefault();
    setSuccess(false);
    setFailMessage('');
    setPasswordErrorMessage(null);
    if (password) {
      setCurrPasswordEnteredError(false);
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
          setPasswordErrorMessage(null);
        }
      }
      if (passwordErrorMessage === null) {
        setPasswordErrorMessage(null);
        setCurrPasswordErrorMessage('');
        setSuccess(false);
        setFail(false);
        setFailMessage('');
        changeUserDetails();
      }
    } else {
      setCurrPasswordEnteredError(true);
      setFail(true);
    }
  }

  const changeUserDetails = async () => {
    try {
      let body = {
        password: password,
        username: username ? username : undefined,
        newPassword: newPassword ? newPassword : undefined,
        avatar: avatar ? avatar : undefined,
        firstname: firstname ? firstname : undefined,
        secondname: secondname ? secondname : undefined,
      };

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
      setCurrPasswordEnteredError(false);
      setCurrPasswordErrorMessage('');
      setUsernameError('');
      setSuccess(true);
      setFail(false);
      setPasswordErrorMessage(null);
    } catch (error) {
      setFail(true);
      // current password incorrect this needs to be true before proceeding
      if (error.response.data.errormessage === 'Current password incorrect') {
        setCurrPasswordErrorMessage(error.response.data.errormessage);
        setUsernameError('');
      }
      // handle error where username is too short
      if (
        error.response.data.errormessage ===
        'Username length must be at least 3 characters'
      ) {
        setUsernameError(error.response.data.errormessage);
        setCurrPasswordErrorMessage('');
        setFailMessage('');
      }
      // handle error where username already exists
      if (error.response.data.errormessage === 'Username already taken') {
        setUsernameError(error.response.data.errormessage);
        setCurrPasswordErrorMessage('');
        setFailMessage('');
      }
      // handle error where no useful details but current password is correct
      if (error.response.data.errormessage === 'No details to change') {
        setFailMessage(error.response.data.errormessage);
        setCurrPasswordErrorMessage('');
        setUsernameError('');
        setFail(false);
      }

      setLoading(false);
    }
  };

  //
  return (
    <>
      <FormContainer>
        <h1> Settings</h1>
        <Card className='accountDetailsCard' id='accountDetailsCard'>
          <h5 style={{ textDecoration: 'underline' }}>Account Information</h5>
          <div style={{ fontSize: 14 }}>
            <p className='userDetailsText'>First name:</p>
            {' ' + userInfo.firstname}
            <br></br>
            <p className='userDetailsText'>Last name:</p>
            {' ' + userInfo.lastname}
            <br></br>
            <p className='userDetailsText'>Email:</p>
            {' ' + userInfo.email}
            <br></br>
            <p className='userDetailsText'>Username:</p>
            {' ' + userInfo.username}
          </div>
        </Card>
        <Card className='accountDetailsForm' id='accountDetailsForm'>
          <Form onSubmit={handleSubmit}>
            <h5 style={{ textDecoration: 'underline' }}>Update Account Information</h5>
            {currPasswordEnteredError && (
              <MessageAlert variant='danger'>
                {'Current password is required'}
              </MessageAlert>
            )}
            {currPasswordErrorMessage && (
              <MessageAlert variant='danger'>
                {currPasswordErrorMessage}
              </MessageAlert>
            )}
            {loading && <LoadingSpinner />}
            <Form.Group className='py-2' controlId='oldPassword'>
              <Form.Label>Current Password* - This is required if you want to update any account information.</Form.Label>
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
                    checked={avatar === image}
                    onChange={(e) => setAvatar(e.currentTarget.value)}
                  >
                    <Image thumbnail src={image} />
                  </ToggleButton>
                </Col>
              ))}
            </Row>
            {usernameError && (
              <MessageAlert variant='danger'>{usernameError}</MessageAlert>
            )}
            <Form.Group className='py-2' controlId='firstname'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter New First Name'
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className='py-2' controlId='username'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter New Last Name'
                value={secondname}
                onChange={(event) => setSecondname(event.target.value)}
              />
            </Form.Group>
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
              <MessageAlert variant='danger'>
                {passwordErrorMessage}
              </MessageAlert>
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
            <Form.Group>
              <Form.Check
                type='checkbox'
                id='show password'
                label='Show password'
                onChange={(e) => {
                  setPasswordShown(e.target.checked);
                }}
              />
            </Form.Group>
            <p style={{ fontSize: 12 }}>
              Passwords must be at least 8 characters long, contain at least one
              lower case character (a-z), one upper case character (A-Z) and one
              number [0-9]!
            </p>
            {success && (
              <MessageAlert variant='success'>
                {'Details successfully changed'}
              </MessageAlert>
            )}
            {fail && (
              <MessageAlert variant='danger'>
                {'Something has gone wrong'}
              </MessageAlert>
            )}
            {failMessage && (
              <MessageAlert variant='info'>
                {'No details entered to change'}
              </MessageAlert>
            )}
            <Row>
              <Col className='text-center py-4'>
                <Button variant='primary' type='submit'>
                  Confirm changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </FormContainer>
    </>
  );
}

export default UserSettingsPage;
