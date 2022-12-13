import { Card, Col, Container } from "react-bootstrap";
import TableHoldings from "../TableHoldings/TableHoldings";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

function HoldingsCard({ data, remainder }) {
    return (
        <>
            <Card>
                <div className="holdingCard">
                    <Col>
                        <h2 className="cardTitle">Holdings<InfoButtonModal title={"What are holdings?"} info={
                            <>
                            <p>These are the contents of your investment portfolio ingame.</p>
                            <p><strong>Why is my spending power less than my overall portfolio value?</strong></p>
                            <p>This is because you have made an unfulfilled limit order, to safeguard this we have put the value of the limit order on hold.</p>
                            </>

                        }/></h2>
                    </Col>
                </div>
                <br />
                <Container>
                    <span style={{fontSize:"120%",  display: "flex", justifyContent: "center", alignItems: "center" }}>Spending power</span>
                    <span style={{fontSize:"140%",  display: "flex", justifyContent: "center", alignItems: "center" }}><strong>{parseFloat(remainder).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></span>
                </Container>
                
                    <TableHoldings data={data} />

            </Card>
        </>
    )

}
export default HoldingsCard;