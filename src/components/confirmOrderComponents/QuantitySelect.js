import { Card, Container, Row, Form, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import MessageAlert from '../widgets/MessageAlert/MessageAlert';

function QuantitySelect({ portfolioBalance, stockprice, setNewPortfolioBalance, setAmountSelected }) {
    const [max, setMax] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [displayBalance, setDisplayBalance] = useState(portfolioBalance);
    const [amount, setAmount] = useState(0);
    const [stockPrice, setStockPrice] = useState("");
    const [error, setError] = useState("");
    const [ focusedInput, setFocus ] = useState(null)

    // sets the quantity for the slider
    useEffect(() => {
        setStockPrice(stockprice)
        if (parseFloat(displayBalance) < 0) {
            setMax(parseFloat(quantity - 0.10))
            setError("")
        }
    }, [quantity, stockprice, displayBalance, amount, portfolioBalance])

    const boxCall = (e) => {
        if (parseFloat(e.target.value)) {
            if ((portfolioBalance - e.target.value) >= 0) {
                setAmount(e.target.value)
                setAmountSelected(e.target.value)
                setQuantity((e.target.value / stockPrice))
                setDisplayBalance(portfolioBalance - (e.target.value))
                setNewPortfolioBalance(portfolioBalance - (e.target.value))
                setError("")
            }
            else {
                setError("Can't have less than 0 balance")
            }
        }
        else if (e.target.value === "" || e.target.value === 0) {
            setAmount("")
            setAmountSelected(0)
            setQuantity(0.00)
            setError("")
            setDisplayBalance(portfolioBalance)
            setNewPortfolioBalance(portfolioBalance)
        }
        else if (typeof e.target.value === 'string' || e.target.value instanceof String) {
            setError("You need to input a number!")
        }
    }

    const sliderCall = (e) => {
        setQuantity(e.target.value)
        setAmount(stockPrice * e.target.value)
        setAmountSelected(stockPrice * e.target.value)
        setDisplayBalance((portfolioBalance - (stockPrice * e.target.value)))
        setNewPortfolioBalance((portfolioBalance - (stockPrice * e.target.value)))
        setError("")
    }

    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>Quantity</h5>
                    {error ? <MessageAlert variant='danger'>{error}</MessageAlert> : <div></div>}
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <h2>Quantity: {parseFloat(quantity).toFixed(2)}</h2>
                        <p><strong>Your Balance: </strong>${parseFloat(displayBalance).toFixed(2)}</p>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={5} xs={6}>
                                    <strong>Amount Selected:</strong> $
                                </Form.Label>
                                <Col sm={5} xs={6}>
                                    <Form.Control
                                        style={{ width: "150px" }}
                                        type="number"
                                        value={amount.toString()}
                                        placeholder={parseFloat(amount).toFixed(2)}
                                        onFocus={()=>setFocus("amount")}
                                        onChange={boxCall} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Row>
                    <input type="range" className="form-range" min={0} max={max} value={quantity} step={0.01}
                        onChange={sliderCall}
                    />
                </Container>
            </Card>
        </>
    );
}

export default QuantitySelect;