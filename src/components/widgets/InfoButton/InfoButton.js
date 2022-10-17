import { Info } from "react-feather";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const InfoButton = ({  title, info }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <sup>
                <Info size={20} color="#595959" onClick={handleShow}
                ></Info>
            </sup>
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
            {/* </div> */}
        </>

    )
}

export default InfoButton;