/// Login Screen ///
// Route:
//  <URL>/login
// Description:
//  This screen contains the components redenred to the user when they are logging in
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import { ToggleButton, Image } from 'react-bootstrap';

/// Widgets ///
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';

/// Layout ///
import FormContainer from '../../components/layout/FormContainer/FormContainer';

import { changeUserDetails } from '../../actions/userActions';

function UserSettingsPage() {
  // constant password holds the value of the input password
  const [password, setPassword] = useState('');
  const [currPasswordEnteredError, setCurrPasswordEnteredError] =
    useState(false);
  // new passwords
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  // add state for passwordChange

  const [avatar, setAvatar] = useState('');

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('');

  //Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const userToken = userInfo.token;

  /// Need loading and error from action
  const userChangeDetails = useSelector((state) => state.userChangeDetails);
  let { error, success, loading } = userChangeDetails;

  var images = [
    '/stock_photo_1.jpg',
    '/stock_photo_2.jpg',
    '/stock_photo_3.jpg',
    '/stock_photo_4.jpg',
  ];

  function handleSubmit(event) {
    event.preventDefault();
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
        dispatch(
          changeUserDetails(
            password,
            username,
            newPassword,
            avatar,
            firstname,
            secondname,
            userToken
          )
        );
      }
    } else {
      setCurrPasswordEnteredError(true);
    }
  }

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
            {error === 'Current password incorrect' && (
              <MessageAlert variant='danger'>{error}</MessageAlert>
            )}
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
                    checked={avatar === image}
                    onChange={(e) => setAvatar(e.currentTarget.value)}
                  >
                    <Image thumbnail src={image} />
                  </ToggleButton>
                </Col>
              ))}
            </Row>
            <Form.Group className='py-2' controlId='firstname'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter New First name'
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className='py-2' controlId='username'>
              <Form.Label>Second name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter New Second name'
                value={secondname}
                onChange={(event) => setSecondname(event.target.value)}
              />
            </Form.Group>
            {error === 'Username already taken' && (
              <MessageAlert variant='danger'>{error}</MessageAlert>
            )}
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
            {error && error !== 'No details to change' && (
              <MessageAlert variant='danger'>
                {'Something has gone wrong'}
              </MessageAlert>
            )}
            {error === 'No details to change' && (
              <MessageAlert variant='danger'>{error}</MessageAlert>
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
