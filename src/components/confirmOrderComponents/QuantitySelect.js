import { Card, Container, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

function QuantitySelect() {

    const [value, setValue] = useState(50);


    return (
        <>
            <Card>
                <Container>
                    <h5>Quantity</h5>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <h2>{value}</h2>
                        <p>$1400</p>
                    </Row>
                    <input type="range" className="form-range" min={0} max={100} value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Container>
            </Card>
        </>
    );
}

export default QuantitySelect;