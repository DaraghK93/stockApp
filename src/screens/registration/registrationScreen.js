/// Registration Screen ///
// Route:
//  <URL>/register
// Description:
//  This screen contains the components rendered to the user when they are registering to use the site.

import { useState, useEffect } from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { login } from '../actions/userActions'
import { useNavigate,Link } from "react-router-dom"

function RegistrationPage() {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
    const {loading, error, userInfo} = user;

    function handleSubmit(event) {
        event.preventDefault();
        // dispatch(register(firstName, lastName, userName, dateOfBirth, email, password));
      }
       

      useEffect (() => {
        if(userInfo){

          navigate('/userDashboard');
        }
      },[userInfo,navigate])
    

    return(
        <>
        <Container>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="py-2" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className="py-2" controlId="secondName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="py-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="py-2" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)} />
            </Form.Group>
            <Form.Group className="py-2" controlId="dateOfBirth">
                <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="py-2" controlId="username">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Create Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </Form.Group> 
            <Form.Group className="py-2" controlId="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>
            <Row>
                <Col className="text-center py-4">
            <Button variant="primary" type="submit">
              Register
            </Button>
            </Col>
            </Row>

        </Form>
        </Container></>

        )
}

export default RegistrationPage