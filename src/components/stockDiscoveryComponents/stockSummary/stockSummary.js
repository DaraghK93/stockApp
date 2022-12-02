import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../tickercard/Tickercard';
import {useSelector} from 'react-redux';


function StockSummary() {
    const [stocks, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //Redux
    const user = useSelector((state) => state.user)
    const { userInfo } = user
    const userToken = userInfo.token

    useEffect(() => {
        const getStocks = async () =>{
                try{
                    setLoading(true)
                    let path = `/api/stock?keyword=undefined`
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
        },[userToken])


    return(
        <>
        {loading ? <LoadingSpinner /> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
        <>
        
        <h3 className="stockdiscoveryRow">Recommended For You</h3>
        <SideScrollMenu>
                {stocks[0].recommend.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Today's Biggest Positive Movers</h3>
        <SideScrollMenu>
                {stocks[0].topGainers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Today's Biggest Negative Movers</h3>
        <SideScrollMenu>
                {stocks[0].topLosers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Companies That Have Great Environmental Policies</h3>
        <SideScrollMenu>
                {stocks[0].topEnvironment.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Companies That Have Great Social Structures</h3>
        <SideScrollMenu>
                {stocks[0].topSocial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Companies That Have Great Governance</h3>
        <SideScrollMenu>
                {stocks[0].topGovernance.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Today's Top Moving Tech Stocks</h3>
        <SideScrollMenu>
                {stocks[0].Technology.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Today's Top Moving Financial Service Stocks</h3>
        <SideScrollMenu>
                {stocks[0].Financial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        </>}
        </>
    )
}

export default StockSummary;