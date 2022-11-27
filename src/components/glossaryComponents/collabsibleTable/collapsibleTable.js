import { Table, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'
import EnvironmentalRating from "../../stockVisualisationComponents/ESGRatingSliders/EnvironmentalRating";



function CollapsibleTable() {
    return (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>I'm completely new to stock investing, what do I need to know?</Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is a stock?</Accordion.Header>
            <Accordion.Body>
              A stock is a unit of ownership in a company. By owning a stock, you are 
              a shareholder in a company.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What are ticker symbols? e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What is a stock price?</Accordion.Header>
            <Accordion.Body>
              This is the current value of one unit of a stock. The price of a stock can change due to
              various market forces. <br/><br/>
              These market forces include supply and demand. If the demand for a stock increases, and fewer
              people wish to sell, decreasing the supply, then the price of the stock will increase. Investors 
              often base their decisions on positive and negative news sentiment. <br/><br/>

              Further information on what causes stock prices to change can be found <a href="https://www.disnat.com/en/learning/trading-basics/stock-basics/what-causes-stock-prices-to-change" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Why do we want to see past performance of a stock?</Accordion.Header>
            <Accordion.Body>
              Analysts often review historical data when trying to predict how a stock will react to a 
              situation or to spot patterns in a stock's price movements. While it cannot be expected that history will 
              repeat itself, investors can use this data to aid their decision making. <br/><br/>
              Further information about the pros and cons of analysing past performance can be found <a href="https://www.investopedia.com/terms/h/historical-returns.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What do I need to know about ESG?</Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What does ESG stand for and what does it mean?</Accordion.Header>
            <Accordion.Body>
              ESG stands for <b>Environmental</b>, <b>Social</b> and <b>Governance</b>. These are a set of standards 
              for each company's behaviour. These ratings are designed to help investors to invest
              in a socially conscious way. A good ESG rating means a company is managing its environment, social, and 
              governance risks well relative to its peers. A poor ESG rating is the opposite - - the company has 
              relatively higher unmanaged exposure to ESG risks. <br/><br/>
              Further information about ESG investing and the standards can be found  
              <a href="https://www.investopedia.com/terms/e/environmental-social-and-governance-esg-criteria.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Where do the ratings come from?</Accordion.Header>
            <Accordion.Body>
              The data comes from <b>ESG Enterprise</b>, who rate over 50,000 companies as regards ESG 
              ratings. Their aim is to help companies to improve their ESG standards. The Environmental, 
              Social and Governance capabilities of each company is rated out of 1,000 where 1,000
              is the highest and 0 is the lowest. <br/><br/>
              Further information about ESG Enterprise and their ratings can be found   
              <a href="https://www.esgenterprise.com/about-us-esg-enterprise/" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What criteria is examined when deciding a company's Environmental Rating?</Accordion.Header>
            <Accordion.Body>
              Environmental issues include can include factors such as Carbon emissions, 
              Climate change vulnerability, Water sourcing, Biodiversity & land use, 
              Toxic emissions & waste, Packaging material & waste, and Electronic waste.
              The environmental ratings are based on a number of factors which include:
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
            <Accordion.Header>What criteria is examined when deciding a company's Social Rating?</Accordion.Header>
            <Accordion.Body>
              The social rating is based on the company's relationship with it's <a href="https://www.investopedia.com/terms/s/stakeholder.asp" target="_blank" rel="noopener noreferrer">stakeholders</a>.  
              The factors that are examined include:
              <ul>
              <li>Are the suppliers held to the same standards as the company?</li>
              <li>Is a portion of the company's profits donated to the local community?</li>
              <li>Are workplace conditions of a high standard?</li>
              <li>Does the company ever take advantage of its customers?</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>What criteria is examined when deciding a company's Governance Rating?</Accordion.Header>
            <Accordion.Body>
            Governance issues can include: Composition of the board in terms of diversity & independence, 
            Executive compensation, Accounting practices, Business ethic, and Tax transparency.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>What do the ESG graphics mean?</Accordion.Header>
            <Accordion.Body>
            Similar to a 5-star rating, each company has been assigned a rating out of 5 for each of 
            the three metrics (Environmental, Social, Governance). <br/>
            The graphics look like this:<br/>
            Environmental: <EnvironmentalRating erating={2.5} />
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Fantasy Stocks</Accordion.Header>
            <Accordion.Body>
            <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is the game?</Accordion.Header>
            <Accordion.Body>
              Users can create and enter leagues with their friends, building portfolios
              to see who can make the most money. Users can learn about different types 
              of trading and how the stock market works.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Am I using real money?</Accordion.Header>
            <Accordion.Body>
            No, the money is all virtual, removing the element of risk while still 
              allowing players to learn about investing in a controlled environment. The creator
              of each league has the ability to decide the budget for the league, allowing for 
              lower starting budgets to aid realism or allowing the users to start with extortionate amounts
              to allow them to go crazy!
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What are the different types of trades that I can do within the game?</Accordion.Header>
            <Accordion.Body>
              As in the real world, there are different types of trading that can be done. The two types
              types of trades or <b>orders</b> are <b>Market</b> and <b>Limit</b> orders.<br/><br/>
              <h5>Market Orders</h5>
              Market Orders are orders that are completed instantly, if the user has enough money to do so.
              These are the most common types of orders that users will see in the real world.
              <h5>Limit Orders</h5>
              Limit orders are orders that are put in place ahead based on the investor's predictions.
              For example, if an investor thinks that a stock may drop below a certain price, but that
              the stock is worth more than that price, they can place a limit order to buy that stock as soon as it
              hits that price.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Is there a limit on the number of stocks that I can invest in?</Accordion.Header>
            <Accordion.Body>
              This varies depending on the rules that are set out by the creator of the league. 
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>If I don't have any friends, can I still enter a league?</Accordion.Header>
            <Accordion.Body>
              Yes, there will be public leagues available to users which do not require a code.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I invite my ?</Accordion.Header>
            <Accordion.Body>
              As in the real world, there are different types of trading that can be done. The two types
              types of trades or <b>orders</b> are <b>Market</b> and <b>Limit</b> orders.<br/><br/>
              <h5>Market Orders</h5>
              Market Orders are orders that are completed instantly, if the user has enough money to do so.
              These are the most common types of orders that users will see in the real world.
              <h5>Limit Orders</h5>
              Limit orders are orders that are put in place ahead based on the investor's predictions.
              For example, if an investor thinks that a stock may drop below a certain price, but that
              the stock is worth more than that price, they can place a limit order to buy that stock as soon as it
              hits that price.
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Ticker Symbol e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item><Accordion.Item eventKey="4">
            <Accordion.Header>Ticker Symbol e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item><Accordion.Item eventKey="5">
            <Accordion.Header>Ticker Symbol e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item><Accordion.Item eventKey="6">
            <Accordion.Header>Ticker Symbol e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item><Accordion.Item eventKey="7">
            <Accordion.Header>Ticker Symbol e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item><Accordion.Item eventKey="8">
            <Accordion.Header>Ticker Symbol e.g. AAPL for Apple</Accordion.Header>
            <Accordion.Body>
              On a stock exchange, every company has its own unique identifier ticker symbol.
              Further information on ticker symbols can be found <a href="https://www.investopedia.com/terms/s/stocksymbol.asp" target="_blank" rel="noopener noreferrer">here</a>.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
}

export default CollapsibleTable;