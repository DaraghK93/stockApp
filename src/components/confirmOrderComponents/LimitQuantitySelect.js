import { Card, Container, Row } from "react-bootstrap";
import { useState } from 'react';
import RangeSlider from "../widgets/RangeSlider/RangeSlider";

function LimitQuantitySelect({setQty, qty, limitPrice, setAmountSelected, setNewPortfolioBalance, portfolioBalance, buyOrSell }) {
    const [quantity, setQuantity] = useState(0);

    const sliderCall = (e) => {
        setQuantity(e.target.value)
        setQty(e.target.value)
        setAmountSelected(e.target.value * limitPrice)
        setNewPortfolioBalance(portfolioBalance - (e.target.value * limitPrice))
    }

    




    console.log(qty)
    return (
         <Card className="px-3">
                <h5 style={{ marginTop: "10px"}}>Quantity </h5>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                    <h2>{parseFloat(qty).toFixed(2)} stocks</h2>
                     <RangeSlider 
                        label={"$"}
                        setter={setQty}
                        state={qty}
                        min={0}
                        max={10}
                        startWidth={"2rem"}
                        showError={true}
                        reset={buyOrSell}
                        resetValue={"1"}
                    />
                </Card.Body>
            </Card>
    )
}
//   <Card>
//             <Container>
//                 <h5 style={{ marginTop: "10px" }}>Quantity</h5>
//                 <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
//                     <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{parseFloat(quantity).toFixed(2)} stocks</h2>
//                     <br></br><br></br><br></br>
//                     </Row>
//                     <input type="range" className="form-range" min={0} max={10} value={quantity} step={0.01}
//                         onChange={sliderCall}
//                     />
//             </Container>
//         </Card>
export default LimitQuantitySelect;