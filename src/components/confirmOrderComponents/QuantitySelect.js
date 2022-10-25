import { Card, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function QuantitySelect({ portfolioBalance }) {
    const [max, setMax] = useState();
    const [value, setValue] = useState(max/2);
    const [balance, setBalance] = useState(portfolioBalance);
    

    const stockPrice = 100

    useEffect(() => {
        if (portfolioBalance - (stockPrice * value) < 0) {
            setMax(value - 1)
        }
        setBalance(portfolioBalance - (stockPrice * value))
    }, [portfolioBalance, value])

    return (
        <>
            <Card>
                <Container>
                    <h5>Quantity</h5>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <h2>Quantity: {value}</h2>
                        <p>Your Balance: {balance}</p>
                    </Row>
                    <input type="range" className="form-range" min={0} max={max} value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Container>
            </Card>
        </>
    );
}

export default QuantitySelect;