import { Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import RangeSlider from '../widgets/RangeSlider/RangeSlider';
import MessageAlert from '../widgets/MessageAlert/MessageAlert';

function QuantitySelect({ dollarAmountSelected, setDollarAmountSelected, buyOrSell, gameTradeFee, holding, setQty,  qty, portfolioBalance,  stockPrice,  setNewPortfolioBalance, marketPriceError, setMarketPriceError }) {
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
            setMarketPriceError("")
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
        }else if (dollarAmountSelected > max){
            if (buyOrSell === "Buy"){
                /// If we a re greater than max in a buy order then we are trying to spend more money than we have 
                setMarketPriceError(`Max quantity with your spending power is ${parseFloat(portfolioBalance -gameTradeFee).toLocaleString('en-US', {style: 'currency', currency: 'USD' })}, try reducing your quantity!`)
            }else if (buyOrSell === "Sell"){
                setMarketPriceError(`Max amount you own and is available to sell is ${parseFloat(holding*stockPrice).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} worth`)
            }
        }else if (dollarAmountSelected < min){
            setMarketPriceError(`Amount needs to be at least $1`)
        }


    },[dollarAmountSelected,buyOrSell,portfolioBalance,setNewPortfolioBalance,stockPrice,gameTradeFee,setQty,max,holding,setMarketPriceError])


    return (
            <Card className="px-3">
                <h5 style={{ marginTop: "10px"}}>Quantity </h5>
                <p>{`Excludes ${parseFloat(gameTradeFee).toLocaleString('en-US', {style: 'currency', currency: 'USD' })} trade fee`}</p>
                <Card.Body style={{"textAlign":"center","alignItems":"center"}}>
                    {marketPriceError && <MessageAlert variant="danger">{marketPriceError}</MessageAlert>}
                    <h2>{parseFloat(qty).toFixed(2)} stocks</h2>
                     <RangeSlider 
                        label={"$"}
                        setter={setDollarAmountSelected}
                        state={dollarAmountSelected}
                        min={min}
                        max={max}
                        startWidth={"2rem"}
                        showError={false}
                        reset={buyOrSell}
                        resetValue={"1"}
                    />
                </Card.Body>
            </Card>
    );
}
export default QuantitySelect;