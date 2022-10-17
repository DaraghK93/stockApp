import { Container, Card } from "react-bootstrap";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

const PlainCard = ({ longname, symbol, logo, info }) => {

    return (
        <>
            <Card className="infoCardStyle">
                <Container>
                    <img src={logo} className="img-fluid" alt="Company Logo" style={{ width: "20%" }} />
                    <div>
                        <dl style={{ marginTop: "10px" }}>
                   
                                <dt><h2>{longname} 
                                <InfoButtonModal 
                                title="Company Information"
                                info={info} />
                                </h2>
                                </dt>
               
                            <dt><h5 style={{ fontFamily: 'Courier New' }}>{symbol}</h5></dt>
                            <dt>$200</dt>
                            <dt>+$50 (25%)</dt>
                        </dl>
                    </div>

                </Container>
            </Card>
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Company Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>{info}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}
export default PlainCard;