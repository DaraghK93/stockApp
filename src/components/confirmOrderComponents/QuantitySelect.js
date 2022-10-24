import { Card, Form, Container } from 'react-bootstrap';

function QuantitySelect() {
    return (
        <>
            <Card>
                <Container>
                    <h5>Quantity</h5>
                    <h2>7</h2>
                    <p>$1400</p>
                    {/* <Form.Range min="1" max="100" onChange={console.log(max)}/> */}
                    <input type="range" class="form-range" min={0} max={5} id="customRange2"/>

                </Container>
            </Card>
        </>
    );
}

export default QuantitySelect;