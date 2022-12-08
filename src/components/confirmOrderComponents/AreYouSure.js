import { Modal, Button, Row} from "react-bootstrap";
import OrderSummary from "./OrderSummary";
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {APIName} from '../../constants/APIConstants'
import { API } from "aws-amplify";
import MessageAlert from "../widgets/MessageAlert/MessageAlert";
import LoadingSpinner from "../widgets/LoadingSpinner/LoadingSpinner";
import {AttachMoney, Clear} from '@mui/icons-material';

function AreYouSure({showState,setShowState,portfolioId,stockId,buyOrSell,orderType,newPortfolioBalance,dollarAmountSelected,qty,limitPrice,stockName,gameTradeFee, stockLogo, gameId}){
    
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
                /// Set the success message, will 
                setSuccess(res)
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
        <Modal centered show={showState} onHide={handleClose} backdrop="static">
            <Row md={1} sm={1} xs={1} className="textCenter pt-1">
                <Modal.Title>{stockName}</Modal.Title>
                <h5 className="newSpendingPowerSubtitle">New Spending Power {parseFloat(newPortfolioBalance).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h5>
            </Row>
        <Modal.Body>
            {error && <MessageAlert variant="danger">{error}</MessageAlert>}
            {/* {success && <MessageAlert variant="success">{success}</MessageAlert>} */}
            {loading && <LoadingSpinner/>}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{
                            width: "10rem",
                            height: "9rem",
                        }}>
                            <img src={stockLogo} style={{
                                maxWidth: "100%",
                                height: "100%",
                                display: "block",
                                objectFit: "contain",
                                marginLeft: "auto",
                                marginRight: "auto"}} 
                                alt="company logo">
                            </img>
                        </div>
                    </div>
            <OrderSummary
                    stockName={stockName}
                    buyOrSell={buyOrSell}
                    orderType={orderType}
                    newPortfolioBalance={newPortfolioBalance}
                    dollarAmountSelected={dollarAmountSelected}
                    gameTradeFee={gameTradeFee}
                    qty={qty}
                    stockLogo={stockLogo}
                    orderSuccess={success}
                    gameId={gameId}
                    />
        </Modal.Body>
        {!success &&
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel <Clear style={{"verticalAlign":"bottom"}}/>
        </Button>
        <Button variant="success" onClick={getStockInfo}>
            Lets Do It! <AttachMoney  style={{"verticalAlign":"bottom"}}/>
        </Button>
        </Modal.Footer>
        }
    </Modal>
    )
}

export default AreYouSure;