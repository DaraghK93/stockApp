import { ProgressBar, Container, Row, Col } from "react-bootstrap";
import moment from 'moment'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CopyComponent from "../../widgets/CopyComponent/CopyComponent";

function TimeLine({ 
    startDate, 
    endDate, 
    portfolios, 
    accessCode, 
 }) {

    var startDateIn = moment(startDate).startOf('day');
    var endDateIn = moment(endDate)
    const currentDate = moment().startOf('day')
    const max = endDateIn.diff(startDateIn, "days")
    const now = currentDate.diff(startDateIn, "days")
    const leftDays = max - now
    const leftDaysUntil = startDateIn.diff(currentDate, "days")

    var accessString = accessCode.toString()

    function lessThanThreePlayersText() {
        if (portfolios.length < 3) {
            if (portfolios.length !== 1) {
                return (
                    <>
                        <p>There are only <strong>{portfolios.length} players</strong> in this game! Wow so lonely! Invite others using the access code: <strong>{accessCode} </strong>
                            <CopyComponent copyText={accessString} /></p>
                    </>)
            }
            else {
                return (
                    <>
                        <p>There is only <strong>{portfolios.length} player</strong> in this game! Wow so lonely!  Invite others using the access code: <strong>{accessCode} </strong>
                            <CopyComponent copyText={accessString} /></p>
                    </>)
            }
        }
    }


    function scheduledOrActive() {
        if (!(currentDate < startDateIn)) {
            return (
                <>
                <ProgressBar striped variant="info" max={max} min={0} now={now} />
                    <span>
                        <p>Only <strong>{leftDays}</strong> more days left in this game! <strong
                        >Make a trade now.</strong></p>
                        {lessThanThreePlayersText()}
                    </span>
                </>
            )  
        } else {
            return  <>
                     <span>
                         <p>Only <strong>{leftDaysUntil}</strong> more days left until this game begins! <strong>Get Practising!</strong></p>
                         {lessThanThreePlayersText()}
                     </span>
                    </>
        }
    }
    


    return (
        <Container>
            <Row>
                <Col xs="auto"><br></br><HourglassBottomIcon fontSize="large" /></Col>
                
                <Col style={{ paddingRight: "1rem" }}>
                    <br></br>


                   {scheduledOrActive()}
                </Col>
            </Row>
        </Container>
    )
}

export default TimeLine;