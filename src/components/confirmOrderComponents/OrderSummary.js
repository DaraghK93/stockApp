import { Container, Row, Table } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

function OrderSummary({ stockName, stockLogo, buyOrSell, orderType, dollarAmountSelected, newPortfolioBalance, qty, gameTradeFee}) {

    return (
                <Container>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{
                            width: "10rem",
                            height: "9rem",
                        }}>
                            <img src={stockLogo} style={{
                                maxWidth: "100%",
                                height: "100%",
                                display: "block",
                                objectFit: "contain",
                                marginLeft: "auto",
                                marginRight: "auto"}} 
                                alt="company logo">
                            </img>
                        </div>
                    </div>
                    <Row className="textCenter">
                        <h3>{buyOrSell}</h3>
                    </Row>
                    <Row className="textCenter">
                        <h3>{parseFloat(qty).toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits: 2})} stocks</h3>
                    </Row>
                    <Row className="textCenter">
                         {buyOrSell === "Buy" ?
                                <h2>Total {(parseFloat(dollarAmountSelected)+parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</h2>
                            :
                            <>
                            {parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee) >= 0 ?
                                <h2>Total {(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</h2>
                            :
                                <h2>Total {(parseFloat(dollarAmountSelected)-parseFloat(gameTradeFee)).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}</h2>
                            } 
                            </>
                         }
                    </Row>
                    <Row className="pt-2">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header align="center" style={{"justifyContent": "center"}}>Trade Details</Accordion.Header>
                            <Accordion.Body>
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
                        </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>  
                    </Row>
                </Container>
    )
}

export default OrderSummary;