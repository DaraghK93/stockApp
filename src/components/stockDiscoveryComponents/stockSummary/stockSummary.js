import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../tickercard/Tickercard';
import {useSelector} from 'react-redux';
import InfoButtonModal from '../../widgets/InfoButtonModal/InfoButtonModal'

import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import Groups3Icon from '@mui/icons-material/Groups3';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import LanIcon from '@mui/icons-material/Lan';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
        
        <h3 className="stockdiscoveryRow">Recommended For You <PersonIcon /><InfoButtonModal title="Personalised Recommendations" info={
                        <div>
                            <p>FinOptimise uses what's known as a content based recommender system to suggest companies that you may be interested in based on your most recent transaction. This Machine Learning model will find you the most similar companies from our database.</p> 
                            <p> If you have not yet made a transaction, the recommender system will give you recommendations based on the highest positive mover over the past 24 hours.</p>
                            <p>More infomation on content based recommender systems and how they work can be found <a href='https://towardsdatascience.com/introduction-to-recommender-systems-1-971bd274f421'>here.</a></p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].recommend.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Top Gainers <TrendingUpIcon /><InfoButtonModal title="Top Gainers" info={
                        <div>
                            <p></p> 

                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topGainers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Top Losers <TrendingDownIcon /><InfoButtonModal title="Top Losers" info={
                        <div>
                            <p>FinOptimise uses what's known as a content based recommender system to suggest companies that you may be interested in based on your most recent transaction. This Machine Learning model will find you the most similar companies from our database.</p> 
                            <p> If you have not yet made a transaction, the recommender system will give you recommendations based on the highest positive mover over the past 24 hours.</p>
                            <p>More infomation on content based recommender systems and how they work can be found <a href='https://towardsdatascience.com/introduction-to-recommender-systems-1-971bd274f421'>here.</a></p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topLosers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Top Environmental <EnergySavingsLeafIcon /></h3>
        <SideScrollMenu>
                {stocks[0].topEnvironment.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Companies That Have Great Social Structures <Groups3Icon /></h3>
        <SideScrollMenu>
                {stocks[0].topSocial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Companies That Have Great Governance <AssuredWorkloadIcon /></h3>
        <SideScrollMenu>
                {stocks[0].topGovernance.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Today's Top Moving Tech Stocks <LanIcon /></h3>
        <SideScrollMenu>
                {stocks[0].Technology.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Today's Top Moving Financial Service Stocks <AttachMoneyIcon /></h3>
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