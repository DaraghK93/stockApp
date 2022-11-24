import {Card,Form,Row,Col,Button} from "react-bootstrap"
import InfoButtonModal from "../../../widgets/InfoButtonModal/InfoButtonModal"
import {Link} from 'react-router-dom';
import FormContainer from "../../../layout/FormContainer/FormContainer";

function JoinAGame(){

    function handleSubmit(event) {
        event.preventDefault()
        console.log("HELLO")
    }



    return(
        <Card>
            <Card.Title className="gameOptionsCardTitle">Join Game
            <InfoButtonModal title="Join A Game" info={
                        <>
                        <p>Games can be joined using an access code</p>
                        <p>An access code can be obtained from the game details screen of an existing game</p>
                        <p>Get in touch with the creator of the game or a player part of the game you want to join and ask for the access code</p>
                        <p>Dont have an access code? <Link to="/game/creategame">Create a New Game</Link></p>
                        </>
                   }/>
            </Card.Title>
            <Card.Body>
                <Card.Text className="gameOptionsCardText">Enter a Game Access Code</Card.Text>
                
                   <FormContainer>
                        <Form  onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                placeholder="Access Code"
                            ></Form.Control>
                        <Row>
                            <Col className="text-center py-4">
                                <Button variant="primary" type="submit">
                                    Join Game!
                                </Button>
                            </Col>
                        </Row>    
                        </Form>
                        
                   </FormContainer>
                   
            </Card.Body>
        </Card>
    )
}

export default JoinAGame