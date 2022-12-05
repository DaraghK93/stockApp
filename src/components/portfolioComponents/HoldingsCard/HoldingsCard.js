import { Card, Col, Container } from "react-bootstrap";
import TableHoldings from "../TableHoldings/TableHoldings";

function HoldingsCard({ data, remainder }) {
    return (
        <>
            <Card>
                <div className="holdingCard">
                    <Col>
                        <h2 className="cardTitle">Holdings</h2>
                    </Col>
                </div>
                <br />
                <Container>
                    <span style={{fontSize:"120%",  display: "flex", justifyContent: "center", alignItems: "center" }}>Spending power</span>
                    <span style={{fontSize:"140%",  display: "flex", justifyContent: "center", alignItems: "center" }}><strong>{parseFloat(remainder).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</strong></span>
                </Container>
                
                    <TableHoldings data={data} />

            </Card>
        </>
    )

}
export default HoldingsCard;