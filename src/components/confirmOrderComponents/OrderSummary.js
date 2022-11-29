import { Card, Container, Table } from "react-bootstrap";

function OrderSummary({ buyOrSell, orderType, amountSelected, newPortfolioBalance, qty }) {
    return (
        <>
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
                                <td>{parseFloat(qty).toFixed(2)} stocks</td>
                            </tr>
                            <tr>
                                <td>New Portfolio Balance</td>
                                <td>${parseFloat(newPortfolioBalance).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Total Cost</td>
                                <td>${parseFloat(amountSelected).toFixed(2).toString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
        </>
    )

}

export default OrderSummary;