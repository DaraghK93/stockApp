
import { Card, Button } from 'react-bootstrap';

function BottomyStickyButton({ text, onClick, disabled }) {
    return (
        <Card className="tradeButtonCard rounded-0" >
            <Card.Body>
                <Button onClick = {onClick} variant="seconday" className="btn btn-secondary btn-lg" disabled={disabled}>{text}</Button>
            </Card.Body>
        </Card>

    );
}

export default BottomyStickyButton;
