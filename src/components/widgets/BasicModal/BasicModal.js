import { Modal, Button} from "react-bootstrap";

function BasicModal({showState, setShowState, title, bodyText}){

    const handleClose = () => setShowState(false);
    return (
        <Modal show={showState} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bodyText}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BasicModal;