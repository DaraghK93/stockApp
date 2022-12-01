import { Container, Table } from "react-bootstrap";

function OrderSummary({ stockName, buyOrSell, orderType, amountSelected, newPortfolioBalance, qty}) {
    return (
        <>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>Order Summary</h5>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Stock</td>
                                <td>{stockName}</td>
                            </tr>
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
                                <td>{parseFloat(qty).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} stocks</td>
                            </tr>
                            <tr>
                                <td>New Portfolio Balance</td>
                                <td>${parseFloat(newPortfolioBalance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                            </tr>
                            <tr>
                                <td>Total Cost</td>
                                <td>${parseFloat(amountSelected).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
        </>
    )

}

export default OrderSummary;