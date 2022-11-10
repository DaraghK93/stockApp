import {Dropdown,Card,Row,Col,ButtonGroup,ToggleButton,Image} from "react-bootstrap"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useSelector} from 'react-redux';

function GameNameImageTypeSelection({gameType, setGameType, gameName, setGameName}){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user;

    var gameNames = [
        `${userInfo.firstname}'s Stock Trading Game`,
        `${userInfo.firstname}'s Fantasy League`,
        `${userInfo.firstname}'s Big Stock Challange`,
        `${userInfo.firstname}'s Investment League`
    ]
    console.log(gameName)
    return(
        <>
        <Row>
            <Dropdown className="py-2">
                <Dropdown.Toggle id="gameName">{gameName}</Dropdown.Toggle>
                    <Dropdown.Menu>
                                {gameNames.map((name) => (
                                    <Dropdown.Item
                                        key={name}
                                        onClick={() => {
                                            setGameName(name)
                                        }}
                                    >{name}</Dropdown.Item>  
                                            ))}

                            </Dropdown.Menu>
                    </Dropdown>
        </Row>
        <ButtonGroup>
            <Row md={2} sm={1} xs={1}>
            <Col className="py-2">
                    <ToggleButton
                        className="gameDetailsToggleButton"
                        key="valueBased"
                        id="radio-valueBased"
                        type="radio"
                        variant='outline-primary'
                        value="valueBased"
                        checked={gameType === "valueBased"}
                        onChange={(e) => setGameType(e.currentTarget.value)}
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
            <Col className="py-2">
                    <ToggleButton
                        className="gameDetailsToggleButton"
                        key="timeBased"
                        id="radio-timeBased"
                        type="radio"
                        variant='outline-primary'
                        value="timeBased"
                        checked={gameType === "timeBased"}
                        onChange={(e) => setGameType(e.currentTarget.value)}
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
        
        </>

        
    )
}

export default GameNameImageTypeSelection;