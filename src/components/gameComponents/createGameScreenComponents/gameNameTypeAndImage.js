import {Dropdown,Card,Row,Col} from "react-bootstrap"
import {useSelector} from 'react-redux';
function GameNameTypeImage({gameName, setGameName}){
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

    return(
        <>
            <h1>Game Details</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Configure Your Game Details</Card.Title>
                <Dropdown className="py-2">
                <Dropdown.Toggle id="gameName">{gameName}</Dropdown.Toggle>
                    <Dropdown.Menu>
                                {gameNames.map((name) => (
                                    <Dropdown.Item
                                        onClick={() => {
                                            setGameName(name)
                                        }}
                                    >{name}</Dropdown.Item>  
                                            ))}

                            </Dropdown.Menu>
                    </Dropdown>
                    <Row className="py-2" md={2} sm={2} xs={1}>
                        <Col>
                        <Card  className="px-1">
                            <Card.Title>Value Based</Card.Title>
                                <Card.Text>
                                    Race to a goal value
                                </Card.Text>
                        </Card>
                        </Col>
                        <Col>
                        <Card  className="px-1">
                            <Card.Title>Time Based</Card.Title>
                                <Card.Text>
                                        Highest value at end wins
                                </Card.Text>
                        </Card>
                        </Col>
                        
                    </Row>

                </Card.Body>
            
            </Card>
            
        </>
    )
}

export default  GameNameTypeImage