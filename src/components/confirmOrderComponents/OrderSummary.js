import { Container, Table } from "react-bootstrap";

function OrderSummary({ stockName, buyOrSell, orderType, dollarAmountSelected, newPortfolioBalance, qty, gameTradeFee}) {

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
                                <td>{parseFloat(qty).toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits: 2})} stocks</td>
                            </tr>
                            <tr>
                                <td>Trade Fee</td>
                                <td>{parseFloat(gameTradeFee).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            <tr>
                                <td>Quantity ($)</td>
                                <td>{parseFloat(dollarAmountSelected).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            {buyOrSell === "Buy" ?
                                <tr>
                                    <td>Total Cost</td>
                                    <td>{(parseFloat(dollarAmountSelected)+parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                                </tr>
                            :
                            <tr>
                                    <td>Sale Value</td>
                                    <td>{(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            } 
                            <tr>
                                <td>New Spending Power</td>
                                <td>{parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
        </>
    )

}

export default OrderSummary;