import { Container, Card, Modal, Button } from "react-bootstrap";
import { Info } from "react-feather"
import { useState } from "react";

const PlainCard = ({ longname, symbol, logo, info }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Card className="infoCardStyle">
                <Container>
                    <img src={logo} className="img-fluid" alt="Company Logo" />
                    <h1>{longname}  <Info size={20} onClick={handleShow} /></h1>
                    <h2 style={{ fontFamily: 'Courier New' }}>{symbol}</h2>
                    <h2>$200 sample Price</h2>
                    <h4>+$50 (25%)</h4>
                </Container>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Company Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>{info}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default PlainCard;