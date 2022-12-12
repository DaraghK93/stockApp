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
import InfoButtonModalWhite from '../../widgets/InfoButtonModal/InfoButtonModal(white)'
import Footer from "../../../components/layout/Footer/footer"
import { IcBaselineCurrencyExchange } from '../../icons/CurrencyExchangeIcon';
import { Fa6SolidChartPie } from '../../icons/PieChart';
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
        {loading ? <LoadingSpinner/> : error  ? <MessageAlert variant='danger'>{error}</MessageAlert> :
        <>
        <h2 className="stockdiscoveryRowTitle">Suggested For You<Person/> <InfoButtonModalWhite title="Personalised Recommendations" info={
                        <div>
                            <p>FinOptimise uses a Machine Learning technology known as a content based recommender systems to suggest companies that you may be interested in. Our Machine Learning models provide two suggested rows:</p>
                            <p><b>Recommended</b> provides recommendations of companies<mark class="positive">similar to your holdings.</mark></p>
                            <p><b>Diversify Your Portfolio</b> provides recommendations of companies that are<mark class="negative">dissimilar to your holdings.</mark></p> 
                            <p>More infomation on content based recommender systems and how they work can be found <a href='https://towardsdatascience.com/introduction-to-recommender-systems-1-971bd274f421'>here.</a></p>
                        </div>} /></h2>
        <h3 className="stockdiscoveryRow">Recommended <IcBaselineCurrencyExchange/> <InfoButtonModalWhite title="Recommended" info={
                        <div>
                            
                            <p>This Machine Learning model will suggest companies from our database that are<mark class="positive">similar</mark>to your most recent transaction.</p>
                            <p> If you have not yet made a transaction, the recommender system will give you recommendations based on companies<mark class="positive">similar</mark>to the<mark class="positive">highest positive mover</mark>over the<mark class="bold">past 24 hours.</mark></p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].recommend.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>
        <h3 className="stockdiscoveryRow">Diversify Your Portfolio <Fa6SolidChartPie/> <InfoButtonModalWhite title="Diversify Your Portfolio" info={
                        <div>
                            <p>This Machine Learning model will suggest companies from our database that are<mark class="negative">dissimilar</mark>to your most recent transaction.</p>
                            <p> If you have not yet made a transaction, the recommender system will give you recommendations based on companies<mark class="negative">dissimilar</mark>to the<mark class="positive">highest positive mover</mark>over the<mark class="bold">past 24 hours.</mark></p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].derecommend.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h2 className="stockdiscoveryRowTitle">Top Movers <Timeline /> <InfoButtonModalWhite title="Top Movers" info={
                        <div>
                            <p>This section displays the top<mark class="positive">positive</mark>and<mark class="negative">negative</mark> movers over the<mark class="bold">past 24 hour period.</mark></p>
                        </div>} /></h2>
        <h3 className="stockdiscoveryRow">Top Gainers <TrendingUp /><InfoButtonModal title="Top Gainers" info={
                        <div>
                            <p>This section shows the<mark class="bold">top 20 companies</mark>ranked by<mark class="positive">largest positive % change</mark>in stock price over the<mark class="bold">past 24 hour period.</mark></p> 
                            <p>An explanation for how price change is calculated is explained <a href='https://www.investopedia.com/terms/c/change.asp'>here.</a></p> 
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topGainers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Top Losers <TrendingDown /><InfoButtonModal title="Top Losers" info={
                        <div>
                            <p>This section shows the<mark class="bold">top 20 companies</mark>ranked by<mark class="negative">largest negative % change</mark>in stock price over the<mark class="bold">past 24 hour period.</mark></p>
                            <p>An explanation for how price change is calculated is explained <a href='https://www.investopedia.com/terms/c/change.asp'>here.</a></p>
                        </div>} /></h3>
        <SideScrollMenu>
                {stocks[0].topLosers.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h2 className="stockdiscoveryRowTitle">Top ESG Stocks <Forest /> <InfoButtonModalWhite title="Top ESG" info={
                        <div>
                            <p>This section shows the<mark class="bold">top 20 companies</mark> ranked by<mark class="positive">Environmental, Social and Governance (ESG) ratings.</mark></p>
                            <p>An explanation for ESG ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                        </div>} /></h2>
                        <h3 className="stockdiscoveryRow">Top Environmental <EnergySavingsLeaf /><InfoButtonModal title="Top Environmental" info={
                            <div>
                                <p>This section shows the<mark class="bold">top 20 companies</mark>ranked by their<mark class="positive">Environmental rating</mark>, as taken from their ESG scores.</p>
                                <p>An explanation for Environmental ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                            </div>} /></h3>
                        <SideScrollMenu>
                            {stocks[0].topEnvironment.map((stockObj) => (
                                <div className='sideScrollCard' key={stockObj._id}>
                                    <TickerCard key={stockObj._id} stock={stockObj} />
                                </div>
                            ))}
                        </SideScrollMenu>
                        <h3 className="stockdiscoveryRow">Top Social <Groups3 /><InfoButtonModal title="Top Social" info={
                            <div>
                                <p>This section shows the<mark class="bold">top 20 companies</mark>ranked by their<mark class="positive">Social rating</mark>, as taken from their ESG scores.</p>
                                <p>An explanation for Social ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                            </div>} /></h3>
                        <SideScrollMenu>
                            {stocks[0].topSocial.map((stockObj) => (
                                <div className='sideScrollCard' key={stockObj._id}>
                                    <TickerCard key={stockObj._id} stock={stockObj} />
                                </div>
                            ))}
                        </SideScrollMenu>
                        <h3 className="stockdiscoveryRow">Top Governance <AssuredWorkload /><InfoButtonModal title="Top Governance" info={
                            <div>
                                <p>This section shows the<mark class="bold">top 20 companies</mark>ranked by their<mark class="positive">Governance rating</mark>, as taken from their ESG scores.</p>
                                <p>An explanation for Governance ratings, along with how they're calculated can be found <Link to="/faqs">here</Link> on our education page. Just scroll down to the "What do I need to know about ESG?" section.</p>
                            </div>} /></h3>
                        <SideScrollMenu>
                            {stocks[0].topGovernance.map((stockObj) => (
                                <div className='sideScrollCard' key={stockObj._id}>
                                    <TickerCard key={stockObj._id} stock={stockObj} />
                                </div>
                            ))}
                        </SideScrollMenu>
        <h2 className="stockdiscoveryRowTitle">Top Stocks By Sector <DataUsage /> <InfoButtonModalWhite title="Top Stocks By Sector" info={
                        <div>
                            <p>This section shows the<mark class="bold">top 20 companies</mark>ranked by<mark class="positive">largest positive % change</mark>in stock price over the<mark class="bold">past 24 hour period</mark>in each of the 11 sectors in the S&P500.</p>
                            <p>Detailed explanations of these 11 sectors can be found <a href='https://corporatefinanceinstitute.com/resources/valuation/the-sp-sectors/'>here.</a></p>
                        </div>} /></h2>
        <h3 className="stockdiscoveryRow">Industrials <Factory /></h3>
        <SideScrollMenu>
                {stocks[0].Industrials.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Technology <Lan /></h3>
        <SideScrollMenu>
                {stocks[0].Technology.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Financial <AttachMoney /></h3>
        <SideScrollMenu>
                {stocks[0].Financial.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Healthcare <LocalHospital /></h3>
        <SideScrollMenu>
                {stocks[0].Healthcare.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

        <h3 className="stockdiscoveryRow">Consumer Cyclical <People /></h3>
        <SideScrollMenu>
                {stocks[0].ConsumerCyc.map((stockObj) => (
                        <div className='sideScrollCard' key={stockObj._id}>
                            <TickerCard key={stockObj._id} stock={stockObj}/>
                        </div>
                     ))}
        </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Consumer Defensive <Groups /></h3>
                    <SideScrollMenu>
                        {stocks[0].ConsumerDef.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Real Estate <Home /></h3>
                    <SideScrollMenu>
                        {stocks[0].RealEstate.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Utilities <ElectricalServices /></h3>
                    <SideScrollMenu>
                        {stocks[0].Utilities.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Communication Services <Cloud /></h3>
                    <SideScrollMenu>
                        {stocks[0].CommunicationServices.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>
                    
                    <h3 className="stockdiscoveryRow">Basic Materials <Science /></h3>
                    <SideScrollMenu>
                        {stocks[0].BasicMaterials.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>

                    <h3 className="stockdiscoveryRow">Energy <ElectricBolt /></h3>
                    <SideScrollMenu>
                        {stocks[0].Energy.map((stockObj) => (
                            <div className='sideScrollCard' key={stockObj._id}>
                                <TickerCard key={stockObj._id} stock={stockObj} />
                            </div>
                        ))}
                    </SideScrollMenu>
                    <Footer />
        </>}
        </>
    )
}

export default StockSummary;