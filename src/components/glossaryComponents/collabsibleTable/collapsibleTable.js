import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import SentimentBadge from '../../widgets/sentimentBadge/SentimentBadge'


function CollapsibleTable() {
    return (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span className="bolded">I'm completely new to stock investing, what do I need to know?</span></Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span className="semibolded">What is a stock?</span></Accordion.Header>
            <Accordion.Body>
              <p>A stock is a unit of ownership in a company. By owning a stock, you are 
              a shareholder in a company.</p>
              <p>There are over 450 stocks that you can explore through this application.
              Stocks can be found by clicking 'Stocks' at the top of this page or by
              clicking <Link className="linkStyle" to="/stockdiscovery">here</Link>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span className="semibolded">What are ticker symbols? e.g. AAPL for Apple</span></Accordion.Header>
            <Accordion.Body>
              <p>On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a className="linkStyle" href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><span className="semibolded">What is a stock price?</span></Accordion.Header>
            <Accordion.Body>
              <p>This is the current value of one unit of a stock. The price of a stock can change due to
              various market forces. </p>
              <p>These market forces include supply and demand. If the demand for a stock increases, and fewer
              people wish to sell, decreasing the supply, then the price of the stock will increase. Investors 
              often base their decisions on positive and negative news sentiment.</p>
              <p>Further information on what causes stock prices to change can be found <a className="linkStyle" href="https://www.disnat.com/en/learning/trading-basics/stock-basics/what-causes-stock-prices-to-change" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header><span className="semibolded">Why do we want to see past performance of a stock?</span></Accordion.Header>
            <Accordion.Body>
              <p>Analysts often review historical data when trying to predict how a stock will react to a 
              situation or to spot patterns in a stock's price movements. While it cannot be expected that history will 
              repeat itself, investors can use this data to aid their decision making.</p>
              <p>Further information about the pros and cons of analysing past performance can be found <a className="linkStyle" href="https://www.investopedia.com/terms/h/historical-returns.asp" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header><span className="semibolded">How often are the stock prices updated?</span></Accordion.Header>
            <Accordion.Body>
              <p>The stock prices are updated every 20 minutes. Performance and database storage costs a lot
              of money. As we are a not-for-profit organisation, at the moment, we decided that updating every
              second or every minute may be too costly. Maybe in the future as the application expands, the 
              team could investigate the possibility of increasing the frequency at which the prices update.</p>
              <p>The price of any stock can be found <a className="linkStyle" href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header><span className="semibolded">Should I invest everything in one stock?</span></Accordion.Header>
            <Accordion.Body>
              <p>You are free to invest in whatever way you want. Best practice for investing involves the
              investor diversifying their stocks. The main benefit of diversification is that it reduces risk.
              The goal of diversifying assets is that by investing in different sectors and areas, the stocks will
              each react differently to market conditions. </p>
              <p>One example is that if you invested solely in airlines and then there is is an airline strike, the value of these
              airlines stocks could drop, resulting in a huge loss for your portfolio. 
              By investing in trains or other transportation companies, you might offset
              these losses with the gains acheived by the benefactors of this strike.  </p>
              <p>Further information about the pros of diversification can be found <a className="linkStyle" href="https://www.investopedia.com/investing/importance-diversification/" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span className="bolded">What do I need to know about ESG?</span></Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span className="semibolded">What does ESG stand for and what does it mean?</span></Accordion.Header>
            <Accordion.Body>
              <p>ESG stands for <b>Environmental</b>, <b>Social</b> and <b>Governance</b>. These are a set of standards 
              for each company's behaviour. These ratings are designed to help investors to invest
              in a socially conscious way. A good ESG rating means a company is managing its environment, social, and 
              governance risks well relative to its peers. A poor ESG rating is the opposite - - the company has 
              relatively higher unmanaged exposure to ESG risks. </p>
              <p>Further information about ESG investing and the standards can be found <a className="linkStyle" href="https://www.investopedia.com/terms/e/environmental-social-and-governance-esg-criteria.asp" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span className="semibolded">Where do the ratings come from?</span></Accordion.Header>
            <Accordion.Body>
              <p>The data comes from <b>ESG Enterprise</b>, who rate over 50,000 companies as regards ESG 
              ratings. Their aim is to help companies to improve their ESG standards. The Environmental, 
              Social and Governance capabilities of each company is rated out of 1,000 where 1,000
              is the highest and 0 is the lowest. </p>
              <p>Further information about ESG Enterprise and their ratings can be found <a className="linkStyle" href="https://www.esgenterprise.com/about-us-esg-enterprise/" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><span className="semibolded">What criteria is examined when deciding a company's Environmental Rating?</span></Accordion.Header>
            <Accordion.Body>
              <p>Environmental issues include can include factors such as Carbon emissions, 
              Climate change vulnerability, Water sourcing, Biodiversity & land use, 
              Toxic emissions & waste, Packaging material & waste, and Electronic waste.
              The environmental ratings are based on a number of factors which include:</p>
              <ul>
              <li>Company's climate policies</li>
              <li>Energy Use</li>
              <li>Waste</li>
              <li>Treatment of Animals</li>
              <li>Pollution</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header><span className="semibolded">What criteria is examined when deciding a company's Social Rating?</span></Accordion.Header>
            <Accordion.Body>
              <p>The social rating is based on the company's relationship with its <a className="linkStyle" href="https://www.investopedia.com/terms/s/stakeholder.asp" target="_blank" rel="noopener noreferrer">stakeholders</a>.  
              The factors that are examined include:</p>
              <ul>
              <li>Are the suppliers held to the same standards as the company?</li>
              <li>Is a portion of the company's profits donated to the local community?</li>
              <li>Are workplace conditions of a high standard?</li>
              <li>Does the company ever take advantage of its customers?</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header><span className="semibolded">What criteria is examined when deciding a company's Governance Rating?</span></Accordion.Header>
            <Accordion.Body>
            <p>Governance issues can include: Composition of the board in terms of diversity & independence, 
            Executive compensation, Accounting practices, Business ethic, and Tax transparency.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header><span className="semibolded">What do the ESG graphics mean?</span></Accordion.Header>
            <Accordion.Body>
            <p>Similar to a 5-star rating, each company has been assigned a rating out of 5 for each of 
            the three metrics (Environmental, Social, Governance). A five out of five rating means that this
            is one of the best stocks in its category, while a rating of one to two means that their 
            ESG policies could do with a bit of work.</p>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><span className="bolded">Fantasy Stocks</span></Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span className="semibolded">What is the game?</span></Accordion.Header>
            <Accordion.Body>
              <p>Users can create and enter leagues with their friends, building portfolios
              to see who can make the most money. Users can learn about different types 
              of trading and how the stock market works. </p>
              <p>You can create a game <Link className="linkStyle" to="/game/creategame">here</Link>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span className="semibolded">Am I using real money?</span></Accordion.Header>
            <Accordion.Body>
              <p>No, the money is all virtual, removing the element of risk while still 
              allowing players to learn about investing in a controlled environment. The creator
              of each league has the ability to decide the budget for the league, allowing for 
              lower starting budgets to aid realism or allowing the users to start with extortionate amounts
              to allow them to go crazy!</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><span className="semibolded">What are the different types of trades that I can do within the game?</span></Accordion.Header>
            <Accordion.Body>
              <p>As in the real world, there are different types of trading that can be done. The two types
              types of trades or <b>orders</b> are <b>Market</b> and <b>Limit</b> orders.</p>
              <span className="semibolded">Market Orders</span>
              <p>Market Orders are orders that are completed instantly, if the user has enough money to do so.
              These are the most common types of orders that users will see in the real world.</p>
              <span className="semibolded">Limit Orders</span>
              <p>Limit orders are orders that are put in place ahead of time based on the investor's predictions.
              For example, if an investor thinks that a stock may drop below a certain price, but that
              the stock is worth more than that price, they can place a limit order to buy that stock as soon as it
              hits that price. This is an example of an investor buying low in the hopes of making a profit when it increases.</p> 
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header><span className="semibolded">Is there a limit on the number of trades that I can make in a day?</span></Accordion.Header>
            <Accordion.Body>
              <p>This varies depending on the rules that are set out by the creator of the league. </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header><span className="semibolded">If I don't have any friends, can I still enter a league?</span></Accordion.Header>
            <Accordion.Body>
              <p>Yes, there will be public leagues available to users which do not require a code. In these 
              leagues you will be competing against players from around the world and the rules of each
              league vary.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header><span className="semibolded">How do I invite my friends?</span></Accordion.Header>
            <Accordion.Body>
              <p>When you have created a game, you will be able to find your unique six character 
              code which your friends can input to join a game. On joining the game, an empty
              portfolio will be created for the user. </p>
              <p>You can join your friend's league <Link className="linkStyle" to="/game">here</Link> and by clicking join game
              and then entering the code that they should have provided to you.</p>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header><span className="bolded">I've never traded before, what do I need to know?</span></Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span className="semibolded">What is stock trading?</span></Accordion.Header>
            <Accordion.Body>
              <p>This is the buying and selling of company stocks in an attempt to make a profit on stock 
              price movements. There are normally two types of investors in stock trading; long-term investors 
              and short-term traders. </p>
              <p>Long-term investors will pick stocks that they believe will have slow, positive growth over 
              a long period of time, e.g. over 1 year. Short-term traders will seek small growth and will 
              generally study the markets continuously and trying to find any opportunities that they spot.
              Short-term traders normally believe in a 'buy low, sell high' mantra. </p>
              <p>To learn more about stock trading click <a className="linkStyle" href="https://www.nerdwallet.com/article/investing/stock-trading-how-to-begin" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span className="semibolded">What are the different types of trades that I can do?</span></Accordion.Header>
            <Accordion.Body>
              <p>As in the real world, there are different types of trading that can be done. The two types
              types of trades or <b>orders</b> are <b>Market</b> and <b>Limit</b> orders.</p>
              <span className="semibolded">Market Orders</span>
              <p>Market Orders are orders that are completed instantly, if the user has enough money to do so.
              These are the most common types of orders that users will see in the real world.</p>
              <span className="semibolded">Limit Orders</span>
              <p>Limit orders are orders that are put in place ahead of time based on the investor's predictions.
              For example, if an investor thinks that a stock may drop below a certain price, but that
              the stock is worth more than that price, they can place a limit order to buy that stock as soon as it
              hits that price. This is an example of an investor buying low in the hopes of making a profit when it increases.</p>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header><span className="bolded">I've seen sentiment mentioned in a few places, what do I need to know?</span></Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><span className="semibolded">What does stock sentiment mean?</span></Accordion.Header>
            <Accordion.Body>
            <p>This information relates to the company's overall sentiment in news outlets or on Twitter. 
              It is hope that these sentiment can be used to aid your investment decisions in game.
                    </p>
                    <p>Sentiment is broken down into the following categories:</p>
                    <p><SentimentBadge sentiment={"positive"} /> This is when the overall sentiment of the article or Tweet is calculated as positive.</p> 
                    <p><SentimentBadge sentiment={"negative"} /> This is when the overall sentiment of the article or Tweet is calculated as negative.</p>
                    <p><SentimentBadge sentiment={"neutral"} /> This is when the overall sentiment of the article or Tweet is calculated as neutral.</p>
                    <p>Read more about sentiment <a className="linkStyle" href="https://www.techtarget.com/searchbusinessanalytics/definition/opinion-mining-sentiment-mining" target="_blank" rel="noopener noreferrer">here</a></p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><span className="semibolded">How does the application decide the sentiment of a news article or Tweet?</span></Accordion.Header>
            <Accordion.Body>
              <p>The application uses artificial intelligence to categorise each news article or Tweet. The keywords
              of the news headlines and the Tweets are fed into the program which decides if they are positive or 
              negative words and an overall sentiment is calculated.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><span className="semibolded">How accurate is this analysis?</span></Accordion.Header>
            <Accordion.Body>
              <p>At the moment, the analysis is over 70% accurate. </p>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
}

export default CollapsibleTable;