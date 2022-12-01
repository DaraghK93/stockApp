import { Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import RangeSlider from '../widgets/RangeSlider/RangeSlider';

function QuantitySelect({ dollarAmountSelected, setDollarAmountSelected, buyOrSell, gameTradeFee, holding, setQty,  qty, portfolioBalance,  stockPrice,  setNewPortfolioBalance }) {
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    
    useEffect(() => {
        //// Set the max and min values 
        if (buyOrSell === "Buy"){
            setMin(1)
            setMax(portfolioBalance-gameTradeFee)
        }else if (buyOrSell === "Sell"){
            setMin(1)
            setMax(holding*stockPrice)
        }

        //// Only Update the states if within max and min limits 
        if (dollarAmountSelected >= 1 &&  dollarAmountSelected <= max){
            /// Calculating the new portfolio balance will differ if its a buy or sell 
            if(buyOrSell === "Buy"){
                /// Quantity is in units of stocks 
                setQty(dollarAmountSelected / stockPrice)
                /// For Buy the new balance will be the cost of the transaction minus the current balance 
                setNewPortfolioBalance((portfolioBalance - dollarAmountSelected - gameTradeFee))
            }else if(buyOrSell === "Sell"){
                /// For sell the new portfolio balance will be the current portfolio balance + dollarAmount Select - game fee
                setQty(dollarAmountSelected / stockPrice)
                setNewPortfolioBalance((parseFloat(portfolioBalance) + parseFloat(dollarAmountSelected) - parseFloat(gameTradeFee)))
            }
        }
    },[dollarAmountSelected,buyOrSell,portfolioBalance,setNewPortfolioBalance,stockPrice,gameTradeFee,setQty,max,holding])


    return (
            <Card className="px-3">
                <h5 style={{ marginTop: "10px"}}>Quantity</h5>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                    <h2>{parseFloat(qty).toFixed(2)} stocks</h2>
                     <RangeSlider 
                        label={"$"}
                        setter={setDollarAmountSelected}
                        state={dollarAmountSelected}
                        min={min}
                        max={max}
                        startWidth={"2rem"}
                        showError={true}
                        reset={buyOrSell}
                        resetValue={"1"}
                    />
                </Card.Body>
            </Card>
    );
}
export default QuantitySelect;