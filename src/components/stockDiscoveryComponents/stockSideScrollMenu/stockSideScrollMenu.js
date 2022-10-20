import {Row,Col,Card} from 'react-bootstrap'
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import TickerCard from '../tickercard/Tickercard'
import { useParams } from 'react-router-dom';


/// API ///
import { APIName } from '../../../constants/APIConstants'
import { API } from "aws-amplify";


function StockSideScrollMenu(){
    
    const [loading, setLoading] = useState(true);
    const [stocks, setStocks] = useState('');
    const [error, setError] = useState("");
   const [infoMsg, setInfoMsg] = useState("");
   let { category } = useParams()

    useEffect(() => {
        /// getStocks ///
        // Description:
        //  Makes a GET request to the backend route GET /api/newsarticles
        const getStockInfo = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);
                // // get the symbol from the url string, use regex to extract capital letters only
                // const symbol = window.location.href.replace(/[^A-Z]/g, '');
                // Set the path and use symbol to get single stock
                // Set the path 
                let path = `/api/stock?category=${category}`
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stock and loading to false 
               setStocks(res)
               setLoading(false);
            } catch (error) {
                // Log the error 
                console.log(error);
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getStockInfo();
    }, [category])


    return(

        <>
             {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> : infoMsg ? <MessageAlert variant='info'>{infoMsg} </MessageAlert>:
          

            {stocks[0].topEnvironment.map((stockObj) => (

                            <TickerCard stock={stockObj} key={stockObj._id} />

                            ))}
     
         
        
        } }
        </>
 )


export default StockSideScrollMenu;