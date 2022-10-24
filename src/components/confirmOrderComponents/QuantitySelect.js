import { Card, Container } from 'react-bootstrap';

function QuantitySelect() {
    return (
        <>
            <Card>
                <Container>
                    <h5>Quantity</h5>
                    <h2>7</h2>
                    <p>$1400</p>
                    <input type="range" className="form-range" min={0} max={2} />
                </Container>
            </Card>
        </>
    );
}

export default QuantitySelect;