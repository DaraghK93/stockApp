/// User Settings Screen ///
// Route:
//  <URL>/changeuserdetails
// Description:
//  This screen contains the components for a user to change their account details
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
  // constant password holds the value of the current user password
  const [password, setPassword] = useState('');
  const [currPasswordEnteredError, setCurrPasswordEnteredError] =
    useState(false);

  // Form fields
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');

  // password error for new password. checked in handle submit
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // toggle to show password or not
  const [passwordShown, setPasswordShown] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const userToken = userInfo.token;

  /// Need loading, error and success from action
  const userChangeDetails = useSelector((state) => state.userChangeDetails);
  let { error, success, loading } = userChangeDetails;

  var images = [
    '/avatar_1.jpeg',
    '/avatar_2.jpeg',
    '/avatar_3.jpeg',
    '/avatar_4.jpeg',
  ];

  function useTrait(initialValue) {
    const [trait, updateTrait] = useState(initialValue);

    let current = trait;

    const get = () => current;

    const set = (newValue) => {
      current = newValue;
      updateTrait(newValue);
      return current;
    };

    return {
      get,
      set,
    };
  }

  const traitError = useTrait('');

  function handleSubmit(event) {
    event.preventDefault();
    let error = traitError.get();
    if (password) {
      setCurrPasswordEnteredError(false);
      // determine if password is to be changed
      if (newPassword || confirmNewPassword) {
        // Check whether password and confirm password are the same. More messages will need to be added.
        if (newPassword !== confirmNewPassword) {
          setPasswordErrorMessage(
            'Password and Confirm Password must be the same!'
          );
          error = traitError.set(
            'Password and Confirm Password must be the same!'
          );
        }
        // Checks if the password is less than 8 characters. Gives a popup warning if it is.
        else if (newPassword.length < 8) {
          setPasswordErrorMessage('Password must be at least 8 characters!');
          error = traitError.set('Password must be at least 8 characters!');
        }
        // Checks if the password contains a lower case character (a-z).
        else if (!/[a-z]/.test(newPassword)) {
          setPasswordErrorMessage(
            'Password must contain at least one lower case English character (a-z)!'
          );
          error = traitError.set(
            'Password must contain at least one lower case English character (a-z)!'
          );
        }
        // Checks if the password contains an upper case character (A-Z).
        else if (!/[A-Z]/.test(newPassword)) {
          setPasswordErrorMessage(
            'Password must contain at least one upper case English character (A-Z)!'
          );
          error = traitError.set(
            'Password must contain at least one upper case English character (A-Z)!'
          );
        }
        // Checks if the password contains number (0-9).
        else if (!/[0-9]/.test(newPassword)) {
          setPasswordErrorMessage(
            'Password must contain at least one number (0-9)!'
          );
          error = traitError.set(
            'Password must contain at least one number (0-9)!'
          );
        } else {
          setPasswordErrorMessage('');
          error = traitError.set('');
        }
      }
      if (error === '') {
        dispatch(
          changeUserDetails(
            password,
            username,
            newPassword,
            avatar,
            firstname,
            lastname,
            email,
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
          <h5>Account Information</h5>
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
            <h5>Update Account Information</h5>
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
              <Form.Label>
                Current Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter current password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
                <Form.Text id="passwordHelpBlock" muted>
                This is required if you want to update any
                account information.
                </Form.Text>
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
                placeholder='Enter New First Name'
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className='py-2' controlId='lastname'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter New Last Name'
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </Form.Group>
            {error === 'Invalid email address. Please try again' && (
              <MessageAlert variant='danger'>{error}</MessageAlert>
            )}
            {error === 'Email already taken' && (
              <MessageAlert variant='danger'>{error}</MessageAlert>
            )}
            <Form.Group className='py-2' controlId='email'>
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter New Email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            {error === 'Username already taken' && (
              <MessageAlert variant='danger'>{error}</MessageAlert>
            )}
            {error === 'Username length must be at least 3 characters' && (
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
            {success && passwordErrorMessage === '' && (
              <MessageAlert variant='success'>
                {'Details successfully changed'}
              </MessageAlert>
            )}
            {error && error !== 'No details to change' && (
              <MessageAlert variant='danger'>
                {'Something has gone wrong'}
              </MessageAlert>
            )}
            {error === 'No details to change' &&
              passwordErrorMessage === '' && (
                <MessageAlert variant='info'>{error}</MessageAlert>
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
