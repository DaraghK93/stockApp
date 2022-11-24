import {Card} from "react-bootstrap"
import InfoButtonModal from "../../../widgets/InfoButtonModal/InfoButtonModal"
import {Link} from 'react-router-dom';

function JoinAGame(){
    return(
        <Card>
            <Card.Title className="gameOptionsCardTitle">Join A Game</Card.Title>
            <Card.Body>
                <Card.Text className="gameOptionsCardText">Enter a Game Access Code
                <InfoButtonModal title="Game Access Code" info={
                        <>
                        <p>An access code can be obtained from the game details screen of an existing game</p>
                        <p>Get in touch with the creator of the game you want to join and ask for the access code</p>
                        <p>Dont have an access code? <Link to="/game/creategame">Create a new game</Link></p>
                        </>
                   }/></Card.Text>
            </Card.Body>
        </Card>
    )
}

export default JoinAGame