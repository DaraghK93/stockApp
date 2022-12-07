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

  return (
    <>
      <div className='stockDiscovery'>
        <Container>
          <Row className='py-3'>
            <h1 style={{ textAlign: 'center' }}>Tradable stocks</h1>
          </Row>
          <Row>
            <Col style={{ alignItems: 'center' }} className='text-center'>
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
            <GameStocksSummary league={league} />
            {/* <GameStocksSummary league={league}></GameStocksSummary> */}
          </Row>
        ) : !isStockSummary && keyword === undefined ? (
          <GameStocksAll league={league}></GameStocksAll>
        ) : (
          keyword !== undefined && (
            <Container>
              <Row md={1} xs={1}>
                <Container>
                  <GameStockSearchResults keyword={keyword} league={league} />
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
