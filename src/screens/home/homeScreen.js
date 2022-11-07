/// Home Screen ///
// Route:
//  <URL>/home
// Description:
//  This screen contains the components redenred to the user when they first visit the page

/// Imports ///
import { Container, Row, Col, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';

function HomeScreen (){

    const navigate = useNavigate(); 


    const navigateRegister = (e) => {
        e.preventDefault()
        navigate(`/register`)
  }



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