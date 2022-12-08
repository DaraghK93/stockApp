import { Container, Table, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

function OrderSummary({ stockName, buyOrSell, orderType, dollarAmountSelected, newPortfolioBalance, qty, gameTradeFee}) {

    return (
                <Container>
                    <h5 style={{ marginTop: "10px" }}>Order Summary</h5>
                    <Row>
                     <tbody>
                            <tr>
                                <td>Buy/ Sell</td>
                                <td>{buyOrSell}</td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>{parseFloat(qty).toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits: 2})} stocks</td>
                            </tr>
                            {buyOrSell === "Buy" ?
                                <tr>
                                    <td className="bolded">Total</td>
                                    <td className="bolded">{(parseFloat(dollarAmountSelected)+parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                                </tr>
                            :
                            <>
                            {parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee) >= 0 ?
                            <tr>
                                <td className="bolded">Total</td>
                                <td className="bolded">{(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            :
                            <tr>
                                <td className="bolded">Total</td>
                                <td className="bolded">{(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            } 
                            </>
                        }
                        </tbody>
                    </Row>
                    <Row className="py-5">
                    <Accordion  defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header align="center" style={{"justify-content": "center"}}>Trade Details</Accordion.Header>
                            <Accordion.Body>
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
                                <td>Subtotal (Quantity x Price)</td>
                                <td>{parseFloat(dollarAmountSelected).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            {buyOrSell === "Buy" ?
                                <tr>
                                    <td className="bolded">Total (Decrease in Spending Power)</td>
                                    <td className="bolded">{(parseFloat(dollarAmountSelected)+parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                                </tr>
                            :
                            <>
                            {parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee) >= 0 ?
                            <tr>
                                <td className="bolded">Total (Increase in Spending Power)</td>
                                <td className="bolded">{(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            :
                            <tr>
                                <td className="bolded">Total (Decrease in Spending Power)</td>
                                <td className="bolded">{(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                            </tr>
                            } 
                            </>
                        }
                        {buyOrSell === "Sell" && orderType === "Limit Order"?
                        <tr style={{"borderTopWidth":"2px","borderTopColor":"grey"}}>
                                <td className="bolded">Potential New Spending Power</td>
                                <td className="bolded">{parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                        </tr>
                        :<tr style={{"borderTopWidth":"2px","borderTopColor":"grey"}}>
                                <td className="bolded">New Spending Power</td>
                                <td className="bolded">{parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</td>
                        </tr>
                        } 
                        </tbody>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>  
                    </Row>
                </Container>
    )
}

export default OrderSummary;