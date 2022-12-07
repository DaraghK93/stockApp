import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import GameStocksSummary from './GameStocksSummary';
import StockSearchBar from '../../stockDiscoveryComponents/stockSearchBar/StockSearchBar';
import { useState, useEffect } from 'react';
import GameStocksAll from './GameStocksAll';
import GameStockSearchResults from './GameStockSearchResults';
import GameStockSearchBar from './GameStockSearchBar';

function GameStocks({ league }) {
  let { keyword } = useParams();

  const [isStockSummary, setIsStockSummary] = useState(true);

  function toggleStockSummary() {
    setIsStockSummary(!isStockSummary);
    keyword = undefined;
  }

  useEffect(() => {
    console.log(isStockSummary);
    console.log(keyword);
  }, [isStockSummary, keyword]);
  return (
    <>
      <div className='stockDiscovery'>
        <Container>
          <Row>
            <h1 style={{ textAlign: 'center' }}>Tradable stocks</h1>
          </Row>
          <Row>
            <Col className='offset'>
              {keyword === undefined && (
                <Button onClick={toggleStockSummary} style={{ width: '10rem' }}>
                  Toggle all stocks
                </Button>
              )}
            </Col>
          </Row>
          <GameStockSearchBar leagueId={league._id} />
        </Container>
        {isStockSummary && keyword === undefined ? (
          <Row md={1} xs={1}>
            <GameStocksSummary />
          </Row>
        ) : !isStockSummary && keyword === undefined ? (
          <GameStocksAll></GameStocksAll>
        ) : (
          keyword !== undefined && (
            <Container>
              <Row md={1} xs={1}>
                <Container>
                  <GameStockSearchResults keyword={keyword} />
                </Container>
              </Row>
            </Container>
          )
        )}
      </div>
    </>
  );
}

export default GameStocks;
