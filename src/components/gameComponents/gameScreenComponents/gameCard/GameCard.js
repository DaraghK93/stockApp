import {Card} from "react-bootstrap"
import moment from "moment";

function GameCard({game}){

    return(
        <Card className=" gameCard">
            <Card.Img className="gameCardImage" src={game.image} alt="Card image" />
            <Card.ImgOverlay >
            <Card.Body>
                <Card.Title>{game.leagueName}</Card.Title>
                
                {game.leagueType === "valueBased" ? 
                <>
                <Card.Text>Value Based Game</Card.Text> 
                <Card.Text>Goal - ${game.winningValue}</Card.Text> 
                </>   
                :
                <>
                <Card.Text>Duration Based Game</Card.Text> 
                <Card.Text>{moment(game.startDate).format('ddd MMM Do YY')} - {moment(game.endDate).format('ddd MMM Do YY')}</Card.Text>
                </>  
            }
            <Card.Text>{game.users.length} Players</Card.Text>
            </Card.Body>
        </Card.ImgOverlay>
        </Card> 
    )
}

export default GameCard;