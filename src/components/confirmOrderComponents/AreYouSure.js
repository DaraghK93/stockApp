import { Modal, Button} from "react-bootstrap";
import OrderSummary from "./OrderSummary";

function AreYouSure({showState,setShowState,buyOrSell,orderType,newPortfolioBalance,amountSelected,qty}){

    const handleClose = () => setShowState(false);
    return(
        <Modal centered show={showState} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Please Review Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <OrderSummary
                    buyOrSell={buyOrSell}
                    orderType={orderType}
                    newPortfolioBalance={newPortfolioBalance}
                    amountSelected={amountSelected}
                    qty={qty}
                        />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel Order 
          </Button>
          <Button variant="success" onClick={handleClose}>
            Confirm Order
          </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default AreYouSure;