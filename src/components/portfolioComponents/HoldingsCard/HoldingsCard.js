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
                <Container>
                    <p>Balance: ${remainder}</p>
                </Container>
        
                    <TableHoldings data={data} />

            </Card>
        </>
    )

}
export default HoldingsCard;