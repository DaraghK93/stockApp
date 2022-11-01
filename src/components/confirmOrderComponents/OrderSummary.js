import { Card, Container } from "react-bootstrap";

function OrderSummary({ buySell, orderType }) {
    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>Order Summary</h5>
                    <ul>
                        <li>Buy/Sell {buySell}</li>
                        <li>Order Type {orderType}</li>
                        <li>Quantity</li>
                        <li>New Porfolio Balance</li>
                        <li>Total Cost </li>
                    </ul>
                </Container>
            </Card>
        </>
    )

}

export default OrderSummary;