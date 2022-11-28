import { ProgressBar, Container, Row, Col } from "react-bootstrap";
import moment from 'moment'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

function TimeLine({ startDate, endDate}) {
    const currentDate = moment()
    const max = endDate.diff(startDate, "days")
    const now = currentDate.diff(startDate, "days")
    const leftDays = max - now

    return (
        <Container>
            <Row>
                <Col xs="auto"><HourglassBottomIcon fontSize="large"/></Col>
                <Col style={{paddingRight: "1rem"}}>
                    <ProgressBar striped variant="info" max={max} min={0} now={now} />
                    <span>
                        <p>Only <strong>{leftDays}</strong> more days left in this game! <strong>Make a trade now.</strong></p>
                    </span>
                </Col>
            </Row>
        </Container>
    )
}

export default TimeLine;