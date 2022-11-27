import { Table, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, Fragment } from "react"
import { ChevronUp, ChevronDown } from "react-feather"
import Accordion from 'react-bootstrap/Accordion'

function CollapsibleTable() {
    return (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>I'm completely new to stock, what do I need to know?</Accordion.Header>
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
              Analysts often review historical data when trying to guess how a stock will react to a 
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Everything about sentiment</Accordion.Header>
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