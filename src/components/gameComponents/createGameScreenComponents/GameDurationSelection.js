import {Card,Row,Col} from "react-bootstrap"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function GameDurationSelection({gameStartDate, setGameStartDate, gameEndDate, setGameEndDate, gameType}){

    console.log(gameStartDate)
    return(
        <>
        <Card.Title className="gameDetailsCardTitle">Time Details</Card.Title>
        <Row className=" py-5">
            <Col className="gameDurationCalenderCol">
                <Calendar 
                    className="gameDurationCalender"
                    onChange={setGameStartDate} value={gameStartDate} />
            </Col>

        </Row>
        
        </>
    )
}

export default GameDurationSelection