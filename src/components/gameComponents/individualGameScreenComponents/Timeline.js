import { ProgressBar, Container, Row, Col } from "react-bootstrap";
import moment from 'moment'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function TimeLine({ startDate, endDate, portfolios, accessCode }) {

    var startDate = moment(startDate);
    var endDate = moment(endDate);
    const currentDate = moment()
    const max = endDate.diff(startDate, "days")
    const now = currentDate.diff(startDate, "days")
    const leftDays = max - now
    var accessString = accessCode.toString()


    function lessThanThreePlayersText() {
        if (portfolios.length < 3) {
            if (portfolios.length != 1) {
                return (
                    <>
                        <p>There are only <strong>{portfolios.length} players</strong> in this game! Invite others to have better time using the access code: <strong>{accessCode} </strong>
                        <ContentCopyIcon fontSize="small" onClick={() => { navigator.clipboard.writeText( accessString ) }}>Copy</ContentCopyIcon></p>
                    </>)
            }
            else {
                return (
                    <>
                        <p>There is only <strong>{portfolios.length} player</strong> in this game! Invite others to have better time using the access code: <strong>{accessCode} </strong>
                        <ContentCopyIcon fontSize="small" onClick={() => { navigator.clipboard.writeText( accessString ) }}>Copy</ContentCopyIcon></p>
                    </>)
            }
        }
    }

    return (
        <Container>
            <Row>
                <Col xs="auto"><br></br><HourglassBottomIcon fontSize="large" /></Col>
                <Col style={{ paddingRight: "1rem" }}>
                    <br></br>
                    <ProgressBar striped variant="info" max={max} min={0} now={now} />
                    <span>
                        <p>Only <strong>{leftDays}</strong> more days left in this game! <strong>Make a trade now.</strong></p>
                        {lessThanThreePlayersText()}
                    </span>
                </Col>
            </Row>
        </Container>
    )
}

export default TimeLine;