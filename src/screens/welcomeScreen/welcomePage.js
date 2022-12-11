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
                    <p>
                        Don't know your stocks from your stonks? Want to learn the basics about investing?
                    </p>
                    <p>Head to the education section and start learning today!
                        </p>
                    <Button className="welcomeButton" as={Link} to="/faqs">Expand my Mind!</Button>
                    
                    
                </Container>
            </Card>
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                        <Card style={{backgroundColor:"#80ced7"}} height={100} className="welcomeInfoCardStyle">
                <Container className="infoCardContainer">
                    <h3>Play </h3>
                    <TwemojiGameDie className="welcomeCardIcons"/>
                    <p>
                        Think you know more than your friends? Prove it here by creating a league and inviting them to play!
                        </p>
                        <p>Head to the games section and show us what you can do!
                        </p>
                    <Button className="welcomeButton" as={Link} to="/game">Lets Play!</Button>
                    
                    
                </Container>
            </Card>
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                        <Card style={{backgroundColor:"#cb88fd"}} height={100} className="welcomeInfoCardStyle">
                <Container className="infoCardContainer">
                    <h3>Explore </h3>
                    <FlatColorIconsBinoculars className="welcomeCardIcons"/>
                    <p>
                        Not all those who wander are lost, but you can get lost in the nearly 500 stocks that can be found on the app!
                    </p>
                    <p>Realise the full capabilities of FinOptimise!</p>
                    <Button className="welcomeButton" as={Link} to="/stockdiscovery">Hook it to my Veins!</Button>
                    
                    
                </Container>
            </Card>
                        </Col>
                    </Row>
                </Container>

        </>
    )
};




export default WelcomePage