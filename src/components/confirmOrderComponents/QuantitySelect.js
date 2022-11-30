import { Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MessageAlert from '../widgets/MessageAlert/MessageAlert';
import RangeSlider from '../widgets/RangeSlider/RangeSlider';

function QuantitySelect({ portfolioBalance, stockPrice, setNewPortfolioBalance, setAmountSelected, amountSelected, setQty }) {
    // const [max, setMax] = useState("");
    const [quantity, setQuantity] = useState(0);
    // const [amount, setAmount] = useState(0);
    // const [stockPrice, setStockPrice] = useState("");
    // const [error, setError] = useState("");

    // sets the quantity for the slider
    // useEffect(() => {
    //     setStockPrice(stockprice)
    //     setMax(parseFloat(portfolioBalance / stockPrice))

    // }, [stockprice, portfolioBalance, stockPrice])

    // const boxCall = (e) => {
    //     if ((portfolioBalance - e.target.value) >= 0) {
    //         setQuantity(e.target.value / stockPrice)
    //         setQty(e.target.value / stockPrice)
    //         setAmount(e.target.value)
    //         setAmountSelected(parseFloat(e.target.value))
    //         setNewPortfolioBalance(portfolioBalance - (e.target.value))
    //         setError("")
    //     }
    //     else if ((portfolioBalance - e.target.value) < 0) {
    //         setError("Can't have less than 0 balance")
    //     }
    //     else if (e.target.value === "" || e.target.value === 0) {
    //         setQuantity(0.00)
    //         setAmount(0)
    //         setAmountSelected(0)
    //         setNewPortfolioBalance(portfolioBalance)
    //     }
    // }

    // const sliderCall = (e) => {
    //     setQuantity(e.target.value)
    //     setQty(e.target.value)
    //     setAmount(parseFloat(stockPrice * e.target.value).toFixed(2))
    //     setAmountSelected(stockPrice * e.target.value)
    //     setNewPortfolioBalance((portfolioBalance - (stockPrice * e.target.value)))
    //     setError("")
    // }


    useEffect(() => {
        setQuantity(amountSelected / stockPrice)
    },[amountSelected])



    return (
            <Card className="px-3">
                <h5 style={{ marginTop: "10px"}}>Quantity</h5>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                    <h2>{parseFloat(quantity).toFixed(2)} stocks</h2>
                     <RangeSlider 
                        label={"$"}
                        setter={setAmountSelected}
                        state={amountSelected}
                        min={1}
                        max={100}
                        startWidth={"2rem"}
                        showError={true}
                    />
                </Card.Body>
            </Card>
    );
}


//   <>
//            <Card>
//                <Container>
//                    <h5 style={{ marginTop: "10px" }}>Quantity</h5>
//                    {error ? <MessageAlert variant='danger'>{error}</MessageAlert> : <div></div>}
//                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
//                        <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{parseFloat(quantity).toFixed(2)} stocks</h2>
//                        <br></br><br></br><br></br>
//                        <Form style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
//                                <Form.Label column sm={5} xs={4}>
//                                    Cost: $
//                                </Form.Label>
//                                <Col sm={5} xs={6}>
//                                    <Form.Control
//                                        style={{ width: "150px" }}
//                                        type="number"
//                                        value={amount}
//                                        placeholder={parseFloat(amount).toFixed(2).toString()}
//                                        onChange={boxCall}
//                                    />
//                                </Col>
//                            </Form.Group>
//                        </Form>
//                    </Row>
//                    <input type="range" className="form-range" min={0} max={max} value={quantity} step={0.00001}
//                        onChange={sliderCall}
//                    />
//                </Container>
//            </Card>
//        </>

export default QuantitySelect;