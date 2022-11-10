import {Dropdown,Card,Row,Col,Container,ButtonGroup,ToggleButton,Image} from "react-bootstrap"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function GameNameImageTypeSelection(){
    return(
        <ButtonGroup>
            <Row md={2} sm={1} xs={1}>
            <Col>
                    <ToggleButton
                        className="gameDetailsToggleButton"
                        variant='outline-primary'
                    >
                        <Card className="gameDetailsGameTypeCard">
                            <Card.Body>
                                <Card.Title>Value Based</Card.Title>
                                    <Card.Text>
                                        Race to a goal value
                                    </Card.Text>
                                    <AttachMoneyIcon fontSize="large"/>
                            </Card.Body>
                        </Card>
                    </ToggleButton>
            </Col>
            <Col>
                    <ToggleButton
                        className="gameDetailsToggleButton"
                        variant='outline-primary'
                    >
                        <Card className="gameDetailsGameTypeCard">
                            <Card.Body>
                                <Card.Title>Time Based</Card.Title>
                                    <Card.Text>
                                        Most profit at end wins
                                    </Card.Text>
                                    <AccessTimeIcon fontSize="large"/>
                            </Card.Body>
                        </Card>
                    </ToggleButton>
                </Col>
            </Row>
        </ButtonGroup>

        
    )
}

export default GameNameImageTypeSelection;