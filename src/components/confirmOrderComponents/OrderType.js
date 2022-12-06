import { Card, Button, Row, Col } from 'react-bootstrap';
import InfoButtonModal from '../widgets/InfoButtonModal/InfoButtonModal';

function OrderType({orderType,setOrderType,buyOrSell}) {

    const handleClick = (event) => {
        if (event.target.id === "1") {
            setOrderType("Market Order")
        }
        else if (event.target.id === "2") {
            setOrderType("Limit Order")
        }
    }

    return (
            <Card className="px-3">
                    <h5 style={{ marginTop: "10px" }}>Order Type
                     <InfoButtonModal title="Order Type" info={
                        <>
                        <p>There are two types of orders to choose from, these are <b>Market</b> and <b>Limit</b> orders.</p>
                        <span className="semibolded">Market Orders - Instant</span>
                        <p>Market Orders are orders that are completed instantly, if the user has enough money to do so.
                        These are the most common types of orders that users will see in the real world.</p>
                        <span className="semibolded">Limit Orders - Future</span>
                        <p>Limit orders are orders that are put in place ahead of time based on the investor's predictions.
                        For example, if an investor thinks that a stock may drop below a certain price, but that
                        the stock is worth more than that price, they can place a limit order to buy that stock as soon as it
                        hits that price. This is an example of an investor buying low in the hopes of making a profit when it increases.</p> 
                        </>
                   }/>
                    </h5>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button
                                id={"1"}
                                active={orderType==="Market Order"}
                                size="lg"
                                onClick={handleClick}
                                variant='outline-primary'
                                className="orderButton"
                            >
                                Market
                                <p className="orderButtonSubtitle">
                                    {buyOrSell === "Buy"? <> Buy Now!</>:<>Sell Now!</>}
                                </p>
                                </Button>
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button
                                id={"2"}
                                size="lg"
                                active={orderType==="Limit Order"}  
                                onClick={handleClick}
                                variant='outline-primary'
                                className="orderButton"
                            >Limit
                            <p className="orderButtonSubtitle">
                                {buyOrSell === "Buy"? <> Buy Later!</>:<>Sell Later!</>}
                            </p>
                            </Button>
                        </Col>
                    </Row>
            </Card>
    );
}

export default OrderType;