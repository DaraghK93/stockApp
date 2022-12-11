import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import GameStocksSummary from './GameStocksSummary';
import { useState, useEffect } from 'react';
import GameStocksAll from './GameStocksAll';
import GameStockSearchResults from './GameStockSearchResults';
import GameStockSearchBar from './GameStockSearchBar';

import ScreenSelectionRadioButton from '../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton';

function GameStocks({ league }) {
  let { keyword } = useParams();
  let { redirect } = useParams();

  const [screen, setScreen] = useState('1');

  /// The choices for the screens, used for buttons at top of screen
  var screenChocies = [
    { name: 'All Stocks', value: '1' },
    { name: 'Summary', value: '2' },
  ];

  useEffect(() => {
    if (redirect) {
      if (redirect === 'all') {
        setScreen('1');
      }
      if (redirect === 'summary') {
        setScreen('2');
      }
    }
  }, [redirect]);

  useEffect(() => {
    setScreen(screen);
  }, [screen]);

  return (
    <>
      <div className='stockDiscovery mb-5'>
        <Container>
          <Row className='py-3'>
            <h1 style={{ textAlign: 'center' }}>Tradable stocks</h1>
          </Row>
          {keyword === undefined && (
            <Row className='py-3' lg={1} md={1} xs={1}>
              <ScreenSelectionRadioButton
                choices={screenChocies}
                state={screen}
                setter={setScreen}
              />
            </Row>
          )}
          <Row>
            <Col>
              <GameStockSearchBar leagueId={league._id} currScreen={screen} />
            </Col>
          </Row>
        </Container>
        {screen === '2' && keyword === undefined ? (
          <Container>
            <Row md={1} xs={1}>
              <GameStocksSummary league={league} />
            </Row>
          </Container>
        ) : screen === '1' && keyword === undefined ? (
          <Container>
            <Row md={1} xs={1}>
              <GameStocksAll league={league}></GameStocksAll>
            </Row>
          </Container>
        ) : (
          keyword !== undefined && (
            <Container>
              <Row md={1} xs={1}>
                <GameStockSearchResults keyword={keyword} league={league} />
              </Row>
            </Container>
          )
        )}
      </div>
    </>
  );
}

export default GameStocks;
