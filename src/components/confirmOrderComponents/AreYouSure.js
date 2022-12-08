import { Modal, Button, Row} from "react-bootstrap";
import OrderSummary from "./OrderSummary";
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {APIName} from '../../constants/APIConstants'
import { API } from "aws-amplify";
import MessageAlert from "../widgets/MessageAlert/MessageAlert";
import LoadingSpinner from "../widgets/LoadingSpinner/LoadingSpinner";

function AreYouSure({showState,setShowState,portfolioId,stockId,buyOrSell,orderType,newPortfolioBalance,dollarAmountSelected,qty,limitPrice,stockName,gameTradeFee}){
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const userToken = userInfo.token


    useEffect(() => {
       /// If these change rest the error on screen, means they went back and fixed/changed something
       /// Old error may not make sense to be shown, will be set again if something wrong with request
       setError("")
       setSuccess("")
    },[qty,buyOrSell,orderType,limitPrice])


    const getStockInfo = async () => {
        try{
                /// Set the portfolio Loading to true and reset error
                setLoading(true)
                setError()
                let path 
                if (buyOrSell === "Buy"){
                    path = '/api/portfolio/buyStock'
                }else{
                    path = '/api/portfolio/sellStock'
                }
                let myInit = {
                    headers : {"x-auth-token": userToken},       
                    body: {
                        portfolioId: portfolioId,
                        stockId: stockId,
                        units: qty,
                        buyOrSell: buyOrSell.toUpperCase(),
                        orderType: orderType
                    }
                }
                if (orderType === "Limit Order"){
                    myInit.body.limitValue = limitPrice
                    myInit.body.orderType= "LIMIT"
                }else{
                    myInit.body.orderType= "MARKET"
                }
                /// Send the request 
                const res = await API.post(APIName, path, myInit)
                /// Set the success message using the
                setSuccess(`Order Successful! $${res.remainder.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} available left to spend`)
                setLoading(false)
        }catch(error){
            setError(error.response.data.errormessage)
            setLoading(false)
        }
     }


    const handleClose = () => {
        /// On close reset the success and errors, they may be going back to make another trade
        setError("")
        setSuccess("")
        setShowState(false);
    }

    return(
        <Modal centered show={showState} onHide={handleClose}>
        <Modal.Header>
            <Row className="textCenter">
                <Modal.Title>{stockName}</Modal.Title>
                <h5 className="newSpendingPowerSubtitle">New Spending Power {parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h5>
            </Row>
        </Modal.Header>
        <Modal.Body>
            {error && <MessageAlert variant="danger">{error}</MessageAlert>}
            {success && <MessageAlert variant="success">{success}</MessageAlert>}
            {loading && <LoadingSpinner/>}
            <OrderSummary
                    stockName={stockName}
                    buyOrSell={buyOrSell}
                    orderType={orderType}
                    newPortfolioBalance={newPortfolioBalance}
                    dollarAmountSelected={dollarAmountSelected}
                    gameTradeFee={gameTradeFee}
                    qty={qty}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel Trade
        </Button>
        <Button variant="success" onClick={getStockInfo}>
            Confirm Trade
        </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default AreYouSure;