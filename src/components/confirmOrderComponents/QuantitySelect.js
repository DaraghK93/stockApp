import { Card, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function QuantitySelect({ portfolioBalance, stockPrice }) {
    const [max, setMax] = useState();
    const [value, setValue] = useState(0);
    const [displayBalance, setDisplaceBalance] = useState(portfolioBalance);
    // const [balance, setBalance] = useState(portfolioBalance);

    useEffect(() => {
        if (portfolioBalance - (stockPrice * value) < 0) {
            setMax(value - 1)
        }
        // setBalance((portfolioBalance - (stockPrice * value)).toFixed(3))
        setDisplaceBalance((portfolioBalance - (stockPrice * value)).toFixed(2))
    }, [portfolioBalance, value, stockPrice])

    return (
        <>
            <Card>
                <Container>
                    <h5>Quantity</h5>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <h2>Quantity: {value}</h2>
                        <p><strong>Your Balance: </strong>{displayBalance}</p>
                        {/* <p>Balance sent to backend: {balance}</p> */}
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