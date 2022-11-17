import {Card,Row,Col} from "react-bootstrap"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function GameDurationSelection({gameStartDate, setGameStartDate, gameEndDate, setGameEndDate, gameType}){
    const setDurationGame = (value,event) => {
        /// Used to set the duration game as package sets value as an array of dates 
        /// Set the start date 
        setGameStartDate(value[0])
        /// Set the end date 
        setGameEndDate(value[1])
    }
    return(
        <>
            {gameType === "valueBased" ?
            <>
            <Card.Title className="gameOptionsCardTitle">Start Date</Card.Title>
            <Row>
                <Col>
                    <Card.Text className="gameDetailsCardText">Games with a start date of today begin immediately</Card.Text>
                    <Card.Text className="gameDetailsCardText">Scheduled games begin at 9 a.m on the scheduled start date</Card.Text>
                </Col>
            </Row>
            <Row className=" py-5">
               <Col className="gameDurationCalenderCol">
                <Calendar 
                    className="gameDurationCalender"
                    formatMonthYear = {(locale, date) => moment(date).format("MMM YYYY")}
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
                    <Card.Text className="gameDetailsCardText" >Games with a start date of today begin immediately</Card.Text>
                    <Card.Text className="gameDetailsCardText" >Scheduled games begin at 9 a.m on the scheduled start date</Card.Text>
                    <Card.Text className="gameDetailsCardText" >Games end at 9 p.m. on the selected end date</Card.Text>
                </Col>
            </Row>
            <Row className=" py-5">
            <Col className="gameDurationCalenderCol">
                <Calendar 
                    className="gameDurationCalender"
                    selectRange={true}
                    formatMonthYear = {(locale, date) => moment(date).format("MMM YYYY")}
                    value={[gameStartDate,gameEndDate]}
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