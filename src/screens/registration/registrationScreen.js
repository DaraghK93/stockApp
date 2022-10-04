/// Registration Screen ///
// Route:
//  <URL>/register
// Description:
//  This screen contains the components rendered to the user when they are registering to use the site.

import { useState } from 'react'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { login } from '../actions/userActions'
import { useNavigate,Link } from "react-router-dom"

function RegistrationPage() {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    // const navigate = useNavigate()
    // const dispatch = useDispatch()
	// const user = useSelector((state) => state.user)
    // const {loading, error, userInfo} = user;
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     dispatch(login(email,password));
    //   }
       

    //   useEffect (() => {
    //     if(userInfo){

    //       navigate('/userDashboard');
    //     }
    //   },[userInfo,navigate])
    

    return(
        <>
        <Container>
        <h1>Login</h1>
        {/* <Form onSubmit={handleSubmit}> */}
        <Form onSubmit={console.log("Hold until redux is ready")}>
            <Form.Group className="py-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="py-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group> 
            <Form.Group className="py-2" controlId="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group> 
            <Row>
                <Col className="text-center py-4">
            <Button variant="primary" type="submit">
              Login
            </Button>
            </Col>
            </Row>

        </Form>
        </Container></>

        )
}

export default RegistrationPage