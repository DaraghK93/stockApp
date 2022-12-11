/// Welcome Screen ///
// Route:
//  <URL>/welcome
// Description:
//  This screen contains the components rendered to the user when they have first registered.

import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TwemojiGameDie from "../../components/icons/RedDieIcon";
import FlatColorIconsReading from "../../components/icons/ReadingIcon";
import FlatColorIconsBinoculars from "../../components/icons/Binoculars";



function WelcomePage() {

    useEffect(() => {

    }, [])



    return (
        
        <>
        
                <Container className="welcome-page-container">
                    <Row>
                        <Col>
                        <h1>Thanks for joining FinOptimise!</h1>
                        <h2>
                            Start learning all about how stocks and markets work!
                        </h2>
                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col sm md={8} className="stockInfoCol">
                        <Card style={{backgroundColor:"#63C7B2"}} height={100} className="welcomeInfoCardStyle">
                <Container className="infoCardContainer">
                    <h3>Learn </h3>
                    <FlatColorIconsReading className="welcomeCardIcons"/>
                    <p>Are you a beginner? Are you a seasoned expert? Regardless of which 
                        category you fall into, there's lots of information to be found for users 
                        of all levels as well as articles and YouTube videos that could give you the edge.
                    </p>
                    <p>
                        Users can also learn all about the game and the different types of games and trading 
                        that are available through the application.
                    </p>
                    <p>Get started today!</p>
                    <Button as={Link} to="/faqs">Expand my Mind!</Button>
                    
                    
                </Container>
            </Card>
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                        <Card style={{backgroundColor:"#80ced7"}} height={100} className="welcomeInfoCardStyle">
                <Container className="infoCardContainer">
                    <h3>Play <TwemojiGameDie/></h3>
                    <p>
                        Are you a competitive person? Maybe you learn best through games. 
                    </p>
                    <p>
                        Users can also learn all about the game and the different types of games and trading 
                        that are available through the application.
                    </p>
                    <p>Get started today!</p>
                    <Button as={Link} to="/faqs">Lets Play!</Button>
                    
                    
                </Container>
            </Card>
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                        <Card style={{backgroundColor:"#8E6C88"}} height={100} className="welcomeInfoCardStyle">
                <Container className="infoCardContainer">
                    <h3>Explore <FlatColorIconsBinoculars/></h3>
                    <p>Are you a beginner? Are you a seasoned expert? Regardless of which 
                        category you fall into, there's lots of information to be found for users 
                        of all levels as well as articles and YouTube videos that could give you the edge.
                    </p>
                    <p>
                        Users can also learn all about the game and the different types of games and trading 
                        that are available through the application.
                    </p>
                    <p>Get started today!</p>
                    <Button as={Link} to="/faqs">I'm ready!</Button>
                    
                    
                </Container>
            </Card>
                        </Col>
                    </Row>
                </Container>

        </>
    )
};




export default WelcomePage