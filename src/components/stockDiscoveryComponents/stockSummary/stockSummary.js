import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../tickercard/Tickercard';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
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
                            <p>This section shows the top 20 companies ranked by largest positive % change in stock price over the past 24 hour period.</p> 
                            <p>An explanation for how price change is calculated is explained <a href='https://www.investopedia.com/terms/c/change.asp'>here.</a></p> 
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
                            <p>This section shows the top 20 companies ranked by largest negative % change in stock price over the past 24 hour period.</p>
                            <p>An explanation for how price change is calculated is explained <a href='https://www.investopedia.com/terms/c/change.asp'>here.</a></p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topLosers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Top Environmental <EnergySavingsLeafIcon /><InfoButtonModal title="Top Environmental" info={
                        <div>
                            <p>This section shows the top 20 companies ranked by their Environmental rating, as taken from their ESG scores.</p>
                            <p>An explanation for Environmental ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topEnvironment.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>


        <h3 className="stockdiscoveryRow">Top Social <Groups3Icon /><InfoButtonModal title="Top Social" info={
                        <div>
                            <p>This section shows the top 20 companies ranked by their Social rating, as taken from their ESG scores.</p>
                            <p>An explanation for Social ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topSocial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Top Governance <AssuredWorkloadIcon /><InfoButtonModal title="Top Governance" info={
                        <div>
                            <p>This section shows the top 20 companies ranked by their Governance rating, as taken from their ESG scores.</p>
                            <p>An explanation for Governance ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topGovernance.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Top Moving Tech Stocks <LanIcon /></h3>
        <SideScrollMenu>
                {stocks[0].Technology.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Top Moving Financial Service Stocks <AttachMoneyIcon /></h3>
        <SideScrollMenu>
                {stocks[0].Financial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Industrials <AttachMoneyIcon /></h3>
        <SideScrollMenu>
                {stocks[0].Industrials.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Financial <AttachMoneyIcon /></h3>
        <SideScrollMenu>
                {stocks[0].Financial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Healthcare <AttachMoneyIcon /></h3>
        <SideScrollMenu>
                {stocks[0].Healthcare.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        {/* <h3 className="stockdiscoveryRow">Consumer Cyclical <AttachMoneyIcon /></h3>
        <SideScrollMenu>
                {stocks[0].ConsumerCyclical.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu> */}

                    {/* <h3 className="stockdiscoveryRow">Consumer Defense <AttachMoneyIcon /></h3>
                    <SideScrollMenu>
                        {stocks[0].ConsumerDefence.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu> */}

                    <h3 className="stockdiscoveryRow">Real Estate <AttachMoneyIcon /></h3>
                    <SideScrollMenu>
                        {stocks[0].RealEstate.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Utilities <AttachMoneyIcon /></h3>
                    <SideScrollMenu>
                        {stocks[0].Utilities.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    {/* <h3 className="stockdiscoveryRow">Communication Services <AttachMoneyIcon /></h3>
                    <SideScrollMenu>
                        {stocks[0].CommunicationServices.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu> */}
                    
                    {/* <h3 className="stockdiscoveryRow">Basic Materials <AttachMoneyIcon /></h3>
                    <SideScrollMenu>
                        {stocks[0].BasicMaterials.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu> */}

                    <h3 className="stockdiscoveryRow">Energy <AttachMoneyIcon /></h3>
                    <SideScrollMenu>
                        {stocks[0].Energy.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

        </>}
        </>
    )
}

export default StockSummary;