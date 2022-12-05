import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import RangeSlider from "../widgets/RangeSlider/RangeSlider";

function LimitQuantitySelect({setQty, qty, limitPrice, setAmountSelected, setNewPortfolioBalance, portfolioBalance, buyOrSell, stockPrice, holding, gameTradeFee }) {
    // const [quantity, setQuantity] = useState(0);

    const [min, setMin] = useState()
    const [max, setMax] = useState()

    // const sliderCall = (e) => {
    //     setQuantity(e.target.value)
    //     setQty(e.target.value)
    //     setAmountSelected(e.target.value * limitPrice)
    //     setNewPortfolioBalance(portfolioBalance - (e.target.value * limitPrice))
    // }

     useEffect(() => {
        //// Set the max and min values 
        if (buyOrSell === "Buy"){
            // Set the min you must buy to 1 share 
            setMin(1)
            // Max you can select is determined by protfolio balance 
            // Round down so you dont get 20 decimal places  
            setMax(Math.floor((portfolioBalance-gameTradeFee)/stockPrice))
        }else if (buyOrSell === "Sell"){
            setMin(1)
            setMax(holding*stockPrice)
        }
        //// Only if the qty is within the max and min limit
        if (qty >= min && qty <= max){
            if(buyOrSell === "Buy"){
                /// For Buy the new the current balance minus the currentStock Price*Qty slected minus the trade fee
                setNewPortfolioBalance((portfolioBalance - ((qty*stockPrice) + gameTradeFee)))
            }else if(buyOrSell === "Sell"){
                /// For sell the new portfolio balance will be the current portfolio balance + dollarAmount Select - game fee
                //setQty(dollarAmountSelected / stockPrice)
                //setNewPortfolioBalance((parseFloat(portfolioBalance) + parseFloat(dollarAmountSelected) - parseFloat(gameTradeFee)))
                console.log("Sell")
            }
        }
    },[buyOrSell,gameTradeFee,holding,max,min,portfolioBalance,qty,setNewPortfolioBalance,stockPrice])

    return (
         <Card className="px-3">
                <h5 style={{ marginTop: "10px"}}>Quantity</h5>
                <p>{`The number of stocks you wish to ${buyOrSell}`}</p>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                     <RangeSlider 
                        setter={setQty}
                        state={qty}
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