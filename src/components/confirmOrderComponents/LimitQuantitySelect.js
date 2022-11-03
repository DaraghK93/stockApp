import { Card, Container, Row } from "react-bootstrap";
import { useState } from 'react';

function LimitQuantitySelect({ setQty, limitPrice, setAmountSelected, setNewPortfolioBalance, portfolioBalance }) {
    const [quantity, setQuantity] = useState(0);

    const sliderCall = (e) => {
        setQuantity(e.target.value)
        setQty(e.target.value)
        setAmountSelected(e.target.value * limitPrice)
        setNewPortfolioBalance(portfolioBalance - (e.target.value * limitPrice))
    }

    return (
        <Card>
            <Container>
                <h5 style={{ marginTop: "10px" }}>Quantity</h5>
                <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>

                    <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{parseFloat(quantity).toFixed(2)} stocks</h2>
                    <br></br><br></br><br></br>

                    </Row>
                    <input type="range" className="form-range" min={0} max={10} value={quantity} step={0.01}
                        onChange={sliderCall}
                    />
            </Container>
        </Card>
    )
}

export default LimitQuantitySelect;