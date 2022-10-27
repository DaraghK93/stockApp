import StockSideScrollMenu from '..//stockSideScrollMenu/stockSideScrollMenu';
import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';

function StockSummary() {
    const [stocks, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getStocks = async () =>{
                try{
                    setLoading(true)
                    let path = `/api/stock?keyword=undefined`
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
        },[])

    return(
        <>
        {loading ? <LoadingSpinner /> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
        <>
        <h3 className="stockdiscoveryRow">Today's Biggest Positive Movers</h3>
        <StockSideScrollMenu data={stocks[0].topGainers} />
        <h3 className="stockdiscoveryRow">Today's Biggest Negative Movers</h3>
        <StockSideScrollMenu data={stocks[0].topLosers} />
        <h3 className="stockdiscoveryRow">Companies That Have Great Environmental Policies</h3>
        <StockSideScrollMenu data={stocks[0].topEnvironment} />
        <h3 className="stockdiscoveryRow">Companies That Have Great Social Structures</h3>
        <StockSideScrollMenu data={stocks[0].topSocial} />
        <h3 className="stockdiscoveryRow">Companies That Have Great Governance</h3>
        <StockSideScrollMenu data={stocks[0].topGovernance} />
        <h3 className="stockdiscoveryRow">Today's Top Moving Tech Stocks</h3>
        <StockSideScrollMenu data={stocks[0].Technology} />
        <h3 className="stockdiscoveryRow">Today's Top Moving Financial Service Stocks </h3>
        <StockSideScrollMenu data={stocks[0].Financial} />
        </>}
        </>
    )
}

export default StockSummary;