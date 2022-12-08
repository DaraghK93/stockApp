import { Info } from "react-feather";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const InfoButtonModalWhite = ({ title, info }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Info className="infoButtonWhiteStyle" onClick={handleShow}></Info>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
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

export default InfoButtonModalWhite;