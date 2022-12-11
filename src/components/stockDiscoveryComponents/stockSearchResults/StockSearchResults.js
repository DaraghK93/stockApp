import {Row } from 'react-bootstrap';
import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import {useSelector} from 'react-redux';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../tickercard/Tickercard';


function StockSearchResults({keyword}) {
    const [stocks, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = useSelector((state) => state.user)
    const { userInfo } = user
    const userToken = userInfo.token

     useEffect(() => {
     const getStocks = async () =>{
            try{
                setLoading(true)
                let path = `/api/stock?keyword=${keyword}`
                const params = {headers : {"x-auth-token": userToken}}
                const res = await API.get(APIName, path, params)
                setStock(res)
                setLoading(false) 
            }catch(error){
                console.log(error)
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getStocks()
    },[userToken, keyword])




    return(
        <>
        {loading ? <LoadingSpinner /> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
        Object.keys(stocks).length !== 0  ?
        <>
        <div className="stocksearchresults">
        <h3 className="stockdiscoveryRow">Showing Results for "{keyword.trim()}"</h3>

        <Row md={1} xs={1}>
            <SideScrollMenu>
                {stocks.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
            </SideScrollMenu>
         
         </Row>
 
         </div>  
        </> :
    
        <>
        <MessageAlert variant='danger'>No results match your search term "{keyword}"</MessageAlert>
        </>
      
         
        }</>
                           
    )

}

export default StockSearchResults