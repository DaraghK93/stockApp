import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import GameStocksSummary from './GameStocksSummary';
import StockSearchBar from '../../stockDiscoveryComponents/stockSearchBar/StockSearchBar';
import StockSearchResults from '../../stockDiscoveryComponents/stockSearchResults/StockSearchResults';
import { useState, useEffect } from 'react';
import GameStocksAll from './GameStocksAll';

function GameStocks({ league }) {
  let { keyword } = useParams();

  const [isStockSummary, setIsStockSummary] = useState(true);

  function toggleStockSummary() {
    setIsStockSummary(!isStockSummary);
  }

  useEffect(() => {
    console.log(isStockSummary);
  }, [isStockSummary]);
  return (
    <>
      <div className='stockDiscovery'>
        <Container>
          <Row>
            <h1 style={{ textAlign: 'center' }}>Tradable stocks</h1>
          </Row>
          <Row>
            <Col className='offset'>
              <Button onClick={toggleStockSummary} style={{ width: '10rem' }}>
                Toggle all stocks
              </Button>
            </Col>
          </Row>
          <StockSearchBar />
        </Container>
        {isStockSummary && keyword === undefined ? (
          <Row md={1} xs={1}>
            <GameStocksSummary />
          </Row>
        ) : isStockSummary && keyword !== undefined ? (
          <Row md={1} xs={1}>
            <Container>
              <StockSearchResults keyword={keyword} />
            </Container>
          </Row>
        ) : !isStockSummary && (
            <GameStocksAll></GameStocksAll>
        )}
      </div>
    </>
  );
}

export default GameStocks;
