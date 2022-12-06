import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import GameStocksSummary from './GameStocksSummary';
import StockSearchBar from '../../stockDiscoveryComponents/stockSearchBar/StockSearchBar';
import StockSearchResults from '../../stockDiscoveryComponents/stockSearchResults/StockSearchResults';
import StockSummary from '../../stockDiscoveryComponents/stockSummary/stockSummary';
import { useState, useEffect } from 'react';

function GameStocks({ league }) {
  let { keyword } = useParams();

  const [isStockSummary, setIsStockSummary] = useState(true);

  function toggleStockSummary() {
    setIsStockSummary(!isStockSummary);
  }

  useEffect(() => {}, [isStockSummary]);
  return (
    <>
      <div className='stockDiscovery'>
        <Container>
          <Row style={{ alignItems: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Stock Discovery</h1>
          </Row>
          <Row>
            <Col>
              <Button style={{ width: '9rem' }}>Show all stocks</Button>
            </Col>
          </Row>
          <StockSearchBar />
        </Container>
        {keyword === undefined ? (
          <Row md={1} xs={1}>
            <GameStocksSummary />
          </Row>
        ) : (
          <Row md={1} xs={1}>
            <Container>
              <StockSearchResults keyword={keyword} />
            </Container>
          </Row>
        )}
      </div>
    </>
  );
}

export default GameStocks;
