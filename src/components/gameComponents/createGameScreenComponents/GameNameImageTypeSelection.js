import {Dropdown,Card,Row,Col,Container,ButtonGroup,ToggleButton,Image} from "react-bootstrap"

function GameNameImageTypeSelection(){
    return(
        <ButtonGroup>
            <Row>
            <Col>
                    <ToggleButton>
                        Duration
                    </ToggleButton>
            </Col>
            <Col>
                    <ToggleButton>
                        Value
                    </ToggleButton>
                </Col>
            </Row>
        </ButtonGroup>

        
    )
}

export default GameNameImageTypeSelection;