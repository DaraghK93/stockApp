import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import RangeSlider from "../widgets/RangeSlider/RangeSlider";
import MessageAlert from "../widgets/MessageAlert/MessageAlert";

function LimitPriceSelect({ portfolioBalance, setAmountSelected, qty, setLimitPrice, setNewPortfolioBalance, limitPrice, buyOrSell,stockPrice, limitOrderPriceError, setLimitOrderPriceError }) {
    const [min, setMin] = useState()
    const [max, setMax] = useState()

    useEffect(() => {
        //// Set the max and min values 
        if (buyOrSell === "Buy"){
            // Set the min you ca set price to 1 dollar 
            setMin(1)
            // Max is dollar off the current stock price  
            setMax(stockPrice-1)
        }else if (buyOrSell === "Sell"){
            setMin(stockPrice+1)
            setMax(stockPrice*1.15)
        }
        /// Check for errors 
        if (limitPrice > max){
            setLimitOrderPriceError(`Price over ${parseFloat(max).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}, try market buy if you want this price!`)
        }else if(limitPrice < min){
            setLimitOrderPriceError(`Price must be at least ${parseFloat(min).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}, try moving the slider to the right!`)
        }else{
            setLimitOrderPriceError("")
        }


    },[buyOrSell,setMin,setMax,stockPrice,max,limitPrice,min,setLimitOrderPriceError])

    // const [price, setPrice] = useState(0);

    return (
        <Card className="px-3">
            <h5 style={{ marginTop: "10px"}}>Price</h5>
                <p>{`The price at which you wish to ${buyOrSell} stocks`}</p>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                    {limitOrderPriceError && <MessageAlert variant="danger">{limitOrderPriceError}</MessageAlert>}
                     <RangeSlider 
                        setter={setLimitPrice}
                        state={limitPrice}
                        label={"$"}
                        min={min}
                        max={max}
                        startWidth={"2rem"}
                        showError={false}
                        reset={buyOrSell}
                        resetValue={
                            buyOrSell === "Buy"? "1" : stockPrice+1
                            }
                    />
                </Card.Body>
        </Card>
    )
}
//  <Card>
//             <Container>
//                 <h5 style={{ marginTop: "10px" }}>Limit Price</h5>
//                 <p><strong>Portfolio A </strong>- Available Balance: ${portfolioBalance}</p>
//                 <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>

//                     <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>${parseFloat(price).toFixed(2)}</h2>
//                     <br></br><br></br><br></br>

//                     </Row>
//                     <input type="range" className="form-range" min={0} max={500} value={price} step={0.01}
//                         onChange={sliderCall}
//                     />
//             </Container>
//         </Card>
export default LimitPriceSelect;