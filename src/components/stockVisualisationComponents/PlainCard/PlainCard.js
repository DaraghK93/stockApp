import { Container, Card } from "react-bootstrap";
import { Info } from "react-feather"

const PlainCard = ({ longname, symbol, logo }) => {
    return (
        <>
            <Card className="infoCardStyle">
                <Container>
                    <img src={logo} className="img-fluid" alt="Company Logo" />
                    <h1>{longname}  <Info size={20}/></h1>
                    <h2 style={{ fontFamily: 'Courier New'}}>{symbol}</h2>
                    <h2>$200 sample Price</h2>
                    <h4>+$50 (25%)</h4>
                </Container>

            </Card>
        </>
    )
}
export default PlainCard;