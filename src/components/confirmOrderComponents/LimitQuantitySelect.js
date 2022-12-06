import { Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import RangeSlider from "../widgets/RangeSlider/RangeSlider";
import MessageAlert from "../widgets/MessageAlert/MessageAlert";

function LimitQuantitySelect({setQty, qty, limitPrice, setDollarAmountSelected, setNewPortfolioBalance, portfolioBalance, buyOrSell, stockPrice, holding, gameTradeFee, 
    limitOrderQuantityError, setLimitOrderQuantityError }) {
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
            setMax(Math.floor((portfolioBalance-gameTradeFee)/limitPrice))
        }else if (buyOrSell === "Sell"){
            setMin(1)
            setMax(parseFloat((holding).toFixed(2)))
        }
        //// Only if the qty is within the max and min limit
        if (qty >= min && qty <= max){
            setLimitOrderQuantityError("")
            if(buyOrSell === "Buy" && (limitPrice>=1 && limitPrice <= stockPrice-1)){
                /// For Buy the new the current balance minus the currentStock Price*Qty slected minus the trade fee
                setNewPortfolioBalance((portfolioBalance - ((qty*limitPrice) + gameTradeFee)))
                /// The amount slected will be the price times the quantity 
                setDollarAmountSelected(qty*limitPrice)
            }else if(buyOrSell === "Sell" && (limitPrice>=1 && limitPrice <= Math.floor(stockPrice*1.15))){
                /// For sell the new portfolio balance will be the current portfolio balance + dollarAmount Select - game fee
                setDollarAmountSelected(qty*limitPrice)
                setNewPortfolioBalance((parseFloat(portfolioBalance) + parseFloat(qty*limitPrice) - parseFloat(gameTradeFee)))
            }
        }else if (qty > max){
            /// Greeater than errors -> For buy they cant afford it, for sell they havent got that many 
            if (buyOrSell === "Buy"){
                setLimitOrderQuantityError(`Cannot afford ${qty} stocks at ${parseFloat(limitPrice).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} a share, try lowering the price or the number of stocks!`)
            }else if (buyOrSell === "Sell"){
                setLimitOrderQuantityError(`You cant sell what you dont have, you own ${holding.toFixed(2)} stocks`)
            }
        }else if (qty < min) {
            setLimitOrderQuantityError(`Number of stocks must be at least ${min}, try moving the slider to the right!`)
        }
    },[buyOrSell,gameTradeFee,holding,max,min,portfolioBalance,qty,setNewPortfolioBalance,stockPrice,limitPrice,setDollarAmountSelected, setLimitOrderQuantityError])

    return (
         <Card className="px-3">
                <h5 style={{ marginTop: "10px"}}>Stocks</h5>
                <p>{`The number of stocks you wish to ${buyOrSell}`}</p>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                    {limitOrderQuantityError && <MessageAlert variant="danger">{limitOrderQuantityError}</MessageAlert>}
                     <RangeSlider 
                        setter={setQty}
                        state={qty}
                        min={min}
                        max={max}
                        startWidth={"2rem"}
                        showError={false}
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