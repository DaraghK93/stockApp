import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import RangeSlider from "../widgets/RangeSlider/RangeSlider";

function LimitPriceSelect({ portfolioBalance, setAmountSelected, qty, setLimitPrice, setNewPortfolioBalance, limitPrice, buyOrSell,stockPrice }) {
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
    },[buyOrSell,setMin,setMax,stockPrice])

    // const [price, setPrice] = useState(0);

    // const sliderCall = (e) => {
    //     setPrice(e.target.value)
    //     setLimitPrice(e.target.value)
    //     setAmountSelected(e.target.value * qty)
    //     setNewPortfolioBalance(portfolioBalance - (e.target.value * qty))
    // }

    return (
        <Card className="px-3">
            <h5 style={{ marginTop: "10px"}}>Price</h5>
                <p>{`The price at which you wish to ${buyOrSell} stocks`}</p>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                     <RangeSlider 
                        setter={setLimitPrice}
                        state={limitPrice}
                        label={"$"}
                        min={min}
                        max={max}
                        startWidth={"2rem"}
                        showError={true}
                        reset={buyOrSell}
                        resetValue={"1"}
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