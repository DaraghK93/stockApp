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
                    <img src={logo} className="img-fluid" alt="Company Logo" style={{ width: "20%" }} />
                    <div>
                        <dl style={{marginTop:"10px"}}>
                            <dt><h2>{longname}  <Info size={20} onClick={handleShow} /></h2></dt>
                            <dt><h5 style={{ fontFamily: 'Courier New' }}>{symbol}</h5></dt>
                            <dt>$200</dt>
                            <dt>+$50 (25%)</dt>
                        </dl>
             

                    </div>

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