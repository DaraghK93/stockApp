/// Home Screen ///
// Route:
//  <URL>/home
// Description:
//  This screen contains the components redenred to the user when they first visit the page

/// Imports ///
import { Container, Row, Col, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';


/// Redux ///
import {useSelector} from 'react-redux';

function HomeScreen (){
    /// Get the user state from redux 
    const user = useSelector((state) => state.user)
    const {userInfo} = user; 
    
    const navigate = useNavigate(); 

    /// When user clicks "Play" button 
    const navigateRegister = (e) => {
        e.preventDefault()
        navigate(`/register`)
    } 


    /// useEffect ///
    //  Using the use effect hook to see if a user is already logged in by checking the userInfo state
    //  If the userInfo state has something in then user already logged in 
    useEffect (() => {
        // Check if userInfo has something in it 
        if(userInfo){
            // Need to redirect to stock discovery  
            navigate('/stockdiscovery');
        }
    },[userInfo,navigate])

    return(
        <Container>
            <Col>
                <Row>
                    <h1>FinOptimse - Fantasy Stock Trading Game</h1>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={navigateRegister}>Play Now</Button>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <h2>About the Game</h2>
                </Row>
            </Col>
            <Col>
                <Row>
                    <h2>Stock Leagues</h2>
                </Row>
            </Col>
            <Col>
                <Row>
                    <h2>Intelligent Components</h2>
                </Row>
            </Col>
            <Col>
                <Row>
                    <h2>Environmenatal Social and Governance (ESG) Investing</h2>
                </Row>
            </Col>
        </Container>
    )

}


export default HomeScreen;