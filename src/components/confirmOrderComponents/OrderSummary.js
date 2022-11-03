import { Card, Container, Table } from "react-bootstrap";

function OrderSummary({ buyOrSell, orderType }) {
    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>Order Summary</h5>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Buy/ Sell</td>
                                <td>{buyOrSell}</td>
                            </tr>
                            <tr>
                                <td>Order Type</td>
                                <td>{orderType}</td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>New Portfolio Balance</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Total Cost</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </Card>
        </>
    )

}

export default OrderSummary;