
import { Card, Button } from 'react-bootstrap';

function TradeButton() {
    return (
        <Card className="tradeButtonCard rounded-0" >
            <Card.Body>
                <Button variant="seconday" className="btn btn-secondary btn-lg">Trade</Button>
            </Card.Body>
        </Card>

    );
}

export default TradeButton;
