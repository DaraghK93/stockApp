import { APIName } from '../../../constants/APIConstants'
import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../tickercard/Tickercard';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

import InfoButtonModalWhite from '../../widgets/InfoButtonModal/InfoButtonModal(white)'

import { Person, Timeline, TrendingUp, TrendingDown, Forest, EnergySavingsLeaf, Groups3, AssuredWorkload, DataUsage, Factory, Lan, AttachMoney, LocalHospital, People, Groups, Home, ElectricalServices, Cloud, Science, ElectricBolt } from '@mui/icons-material';

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

        <h2 className="stockdiscoveryRowTitle">Recommended <Person /><InfoButtonModalWhite title="Personalised Recommendations" info={
                        <div>
                            <p>FinOptimise uses what's known as a content based recommender system to suggest companies that you may be interested in based on your most recent transaction. This Machine Learning model will find you the most similar companies from our database.</p> 
                            <p> If you have not yet made a transaction, the recommender system will give you recommendations based on the highest positive mover over the past 24 hours.</p>
                            <p>More infomation on content based recommender systems and how they work can be found <a href='https://towardsdatascience.com/introduction-to-recommender-systems-1-971bd274f421'>here.</a></p>
                        </div>} /></h2>
        <SideScrollMenu>
                {stocks[0].recommend.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h2 className="stockdiscoveryRowTitle">Top Movers <Timeline /><InfoButtonModalWhite title="Personalised Recommendations" info={
                        <div>
                            <p>This section displays the top positive and negative movers over the past 24 hour period.</p>
                        </div>} /></h2>
        <h3 className="stockdiscoveryRow">Top Gainers <TrendingUp /><InfoButtonModalWhite title="Top Gainers" info={
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


                    <h3 className="stockdiscoveryRow">Top Losers <TrendingDown /><InfoButtonModalWhite title="Top Losers" info={
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

        <h2 className="stockdiscoveryRowTitle">Top ESG Stocks <Forest /><InfoButtonModalWhite title="Top ESG" info={
                        <div>
                            <p>This section shows the top 20 companies ranked by Environmental, Social and Governance (ESG) ratings.</p>
                            <p>An explanation for ESG ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                        </div>} /></h2>
        <h3 className="stockdiscoveryRow">Top Environmental <EnergySavingsLeaf /><InfoButtonModalWhite title="Top Environmental" info={
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

        <h3 className="stockdiscoveryRow">Top Social <Groups3 /><InfoButtonModalWhite title="Top Social" info={
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
        <h3 className="stockdiscoveryRow">Top Governance <AssuredWorkload /><InfoButtonModalWhite title="Top Governance" info={
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

        <h2 className="stockdiscoveryRowTitle">Top Stocks By Sector <DataUsage /><InfoButtonModalWhite title="Top ESG" info={
                        <div>
                            <p>This section displays the top 20 movers by % of their price over the past 24 hour period in each of the 11 sectors in the S&P500.</p>
                            <p>Detailed explanations of these 11 sectors can be found <a href='https://corporatefinanceinstitute.com/resources/valuation/the-sp-sectors/'>here.</a></p>
                        </div>} /></h2>
        <h3 className="stockdiscoveryRow">Top Industrials <Factory /></h3>
        <SideScrollMenu>
                {stocks[0].Industrials.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Top Technology <Lan /></h3>
        <SideScrollMenu>
                {stocks[0].Technology.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Top Financial <AttachMoney /></h3>
        <SideScrollMenu>
                {stocks[0].Financial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Top Healthcare <LocalHospital /></h3>
        <SideScrollMenu>
                {stocks[0].Healthcare.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Top Consumer Cyclical <People /></h3>
        <SideScrollMenu>
                {stocks[0].ConsumerCyc.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Top Consumer Defensive <Groups /></h3>
                    <SideScrollMenu>
                        {stocks[0].ConsumerDef.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Top Real Estate <Home /></h3>
                    <SideScrollMenu>
                        {stocks[0].RealEstate.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Top Utilities <ElectricalServices /></h3>
                    <SideScrollMenu>
                        {stocks[0].Utilities.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Top Communication Services <Cloud /></h3>
                    <SideScrollMenu>
                        {stocks[0].CommunicationServices.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>
                    
                    <h3 className="stockdiscoveryRow">Top Basic Materials <Science /></h3>
                    <SideScrollMenu>
                        {stocks[0].BasicMaterials.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Top Energy <ElectricBolt /></h3>
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