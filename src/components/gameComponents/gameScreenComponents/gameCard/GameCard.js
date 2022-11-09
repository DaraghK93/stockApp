import {Card} from "react-bootstrap"
import moment from "moment";
import { Link } from "react-router-dom";

function GameCard({game}){

    return(
     <Link to={`/game/${game.id}`} style={{ textDecoration: 'none' }}>
        <Card className="gameCard">
                    <Card.Img className="gameCardImage" src={game.image} alt="Card image" />
                    <Card.ImgOverlay >
                    <Card.Body>
                        <Card.Title className="gameCardTitle">{game.leagueName}</Card.Title>
                        
                        {game.leagueType === "valueBased" ? 
                        <>
                        <Card.Text className="gameCardText">Value Based</Card.Text> 
                        <Card.Text className="gameCardText">Goal - ${game.winningValue}</Card.Text> 
                        </>   
                        :
                        <>
                        <Card.Text className="gameCardText">
                            Time Based 
                        </Card.Text> 
                        <Card.Text className="gameCardText">{moment(game.startDate).format('MMM Do YY')} - {moment(game.endDate).format('MMM Do YY')}</Card.Text>
                        </>  
                    }
                    <Card.Text className="gameCardText">{game.users.length} Players</Card.Text>
                    </Card.Body>
                </Card.ImgOverlay>
                </Card> 
     </Link>
        
    )
}

export default GameCard;