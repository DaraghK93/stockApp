import {Col } from 'react-bootstrap';
import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import TickerCard from '../tickercard/Tickercard';


function StockSearchResults({keyword}) {
    const [stocks, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

     useEffect(() => {
     const getStocks = async () =>{
            try{
                setLoading(true)
                let path = `/api/stock?keyword=${keyword}`
                const res = await API.get(APIName, path)
                setStock(res)
                setLoading(false) 
            }catch(error){
                console.log(error)
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getStocks()
    },[keyword])




    return(
        <>
        {loading ? <LoadingSpinner /> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
        <>
         {stocks.map((stockObj) => (
                                <Col className="py-2" key={stockObj._id}>
                                    <TickerCard stock={stockObj}  />
                                </Col>
                            ))}
        </>
         
        }</>
                           
    )

}

export default StockSearchResults