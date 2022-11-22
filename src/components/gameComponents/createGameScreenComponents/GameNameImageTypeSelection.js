import {Dropdown,Card,Row,Col,ButtonGroup,ToggleButton,Image} from "react-bootstrap"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useSelector} from 'react-redux';

function GameNameImageTypeSelection({gameType, setGameType, gameName, setGameName, gameImage, setGameImage}){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user;

    /// gameNames - Unsure if maybe shuld be in database but user should not be able to enter their own name 
    var gameNames = [
        `${userInfo.firstname}'s Stock Trading Game`,
        `${userInfo.firstname}'s Fantasy League`,
        `${userInfo.firstname}'s Big Stock Challange`,
        `${userInfo.firstname}'s Investment League`
    ]

    
    var images = [
        "/stock_photo_1.jpg",
        "/stock_photo_2.jpg",
        "/stock_photo_3.jpg",
        "/stock_photo_4.jpg"
    ]


    return(
        <>
        <Card.Title className="gameOptionsCardTitle">Basic Details</Card.Title>
        <Row>
            <Dropdown className="py-2">
                <Dropdown.Toggle id="gameName">{gameName}</Dropdown.Toggle>
                    <Dropdown.Menu>
                                {gameNames.map((name,idx) => (
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
            <Row className="py-3" md={2} sm={1} xs={1}>
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
            <Row className="py-3" md={4} sm={2} xs={2}>
                {images.map((image, idx) => (
                <Col
                    key={`col-image-${image}`}
                >
                    <ToggleButton
                        className="gameDetailsToggleButton"
                        key={idx}
                        style={{"border":"none"}}
                        id={`radio-${idx}`}
                        variant={'outline-primary'}
                        type="radio"
                        name="radio"
                        value={image}
                        checked={gameImage === image}
                        onChange={(e) => setGameImage(e.currentTarget.value)}
                >
                        <Image thumbnail src={image}/>
                    </ToggleButton> 
                </Col>
            ))}
            </Row>
        </>

        
    )
}

export default GameNameImageTypeSelection;