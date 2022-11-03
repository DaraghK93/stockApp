import { Card, Container, Row } from "react-bootstrap";
import { useState } from 'react';

function LimitPriceSelect({ portfolioBalance, setAmountSelected, qty }) {
    const [price, setPrice] = useState(0);

    const sliderCall = (e) => {
        setPrice(e.target.value)
        setAmountSelected(e.target.value * qty)
    }

    return (
        <Card>
            <Container>
                <h5 style={{ marginTop: "10px" }}>Limit Price</h5>
                <p><strong>Portfolio A </strong>- Available Balance: ${portfolioBalance}</p>
                <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>

                    <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>${parseFloat(price).toFixed(2)}</h2>
                    <br></br><br></br><br></br>

                    </Row>
                    <input type="range" className="form-range" min={0} max={500} value={price} step={0.01}
                        onChange={sliderCall}
                    />
            </Container>
        </Card>
    )
}

export default LimitPriceSelect;