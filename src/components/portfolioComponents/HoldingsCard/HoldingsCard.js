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
                    <span style={{fontSize:"110%"}}><strong>Spending power: ${remainder}</strong></span>
                </Container>
                <br />
                    <TableHoldings data={data} />

            </Card>
        </>
    )

}
export default HoldingsCard;