import { Modal, Button} from "react-bootstrap";
import OrderSummary from "./OrderSummary";
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {APIName} from '../../constants/APIConstants'
import { API } from "aws-amplify";

function AreYouSure({showState,setShowState,portfolioId,stockId,buyOrSell,orderType,newPortfolioBalance,amountSelected,qty,limitPrice}){
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const userToken = userInfo.token



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
                console.log(myInit)
                /// Send the request 
                const res = await API.post(APIName, path, myInit)
                console.log(res)

        }catch(error){
            console.log(error)
            setError(error.response.data.errormessage)
            setLoading(false)

        }
     }


    const handleClose = () => setShowState(false);


    return(
        <Modal centered show={showState} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Please Review Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <OrderSummary
                    buyOrSell={buyOrSell}
                    orderType={orderType}
                    newPortfolioBalance={newPortfolioBalance}
                    amountSelected={amountSelected}
                    qty={qty}
                        />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cancel Order 
        </Button>
        <Button variant="success" onClick={getStockInfo}>
            Confirm Order
        </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default AreYouSure;