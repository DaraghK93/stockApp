import {Card,Row,Col} from "react-bootstrap"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function GameDurationSelection({gameStartDate, setGameStartDate, gameEndDate, setGameEndDate, gameType}){

    
    const setDurationGame = (value,event) => {
        console.log("duration",value)
        /// Set the start date 
        setGameStartDate(value[0])
        setGameEndDate(value[1])
    }


    return(
        <>
        
            {gameType === "valueBased" ?
            <>
            <Card.Title className="gameDetailsCardTitle">Start Date</Card.Title>
            <Row>
                <Col>
                    <Card.Text>Games with a start date of today begin immediately</Card.Text>
                    <Card.Text>Scheduled games begin at 9 a.m on the scheduled start date</Card.Text>
                </Col>
            </Row>
            <Row className=" py-5">
               <Col className="gameDurationCalenderCol">
                <Calendar 
                    className="gameDurationCalender"
                    onChange={setGameStartDate} 
                    minDate={new Date()}
                    value={gameStartDate} />
            </Col> 
            </Row>
            </>
            :
            <>
            <Card.Title className="gameDetailsCardTitle">Start Date and End Date</Card.Title>
            <Row>
                <Col>
                    <Card.Text>Games with a start date of today begin immediately</Card.Text>
                    <Card.Text>Scheduled games begin at 9 a.m on the scheduled start date</Card.Text>
                </Col>
            </Row>
            <Row className=" py-5">
            <Col className="gameDurationCalenderCol">
                <Calendar 
                    className="gameDurationCalender"
                    selectRange={true}
                    minDate={new Date()}
                    onChange={setDurationGame}/>
            </Col> 
            </Row>
            </>
            }
        
        </>
    )
}

export default GameDurationSelection