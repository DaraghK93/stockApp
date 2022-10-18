
import { Card, Button } from 'react-bootstrap';

function TradeButton() {
    return (
        <Card className="tradeButtonCard">
            <Card.Body>
                <Button variant="primary" className="btn btn-primary btn-lg">Trade</Button>
            </Card.Body>
        </Card>

    );
}

export default TradeButton;
