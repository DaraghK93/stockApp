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
            setMin(Math.ceil(stockPrice))
            // setMax(stockPrice*1.15)
            setMax(Math.floor(stockPrice*1.15))
        }
        /// Check for errors 
        if (limitPrice > max){
            /// Limit price greater than the max
            if (buyOrSell === "Buy"){
                /// For Buy it means that it is too close to the current stock price
                setLimitOrderPriceError(`Price over ${parseFloat(max).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}, try market buy if you want this price!`)
            }else if (buyOrSell === "Sell"){
                /// For a sell it means you are trying to increase it above 15% growth 
                setLimitOrderPriceError(`It's ambitious but prices over ${parseFloat(max).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} are too far from current price of ${parseFloat(stockPrice).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}!`)
            }
        }else if(limitPrice < min){
            setLimitOrderPriceError(`Price must be at least ${parseFloat(min).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}, try moving the slider to the right!`)
        }else{
            setLimitOrderPriceError("")
        }


    },[buyOrSell,setMin,setMax,stockPrice,max,limitPrice,min,setLimitOrderPriceError])


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

export default LimitPriceSelect;