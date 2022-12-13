import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import GameStocksSummary from './GameStocksSummary';
import { useState, useEffect } from 'react';
import GameStocksAll from './GameStocksAll';
import GameStockSearchResults from './GameStockSearchResults';
import GameStockSearchBar from './GameStockSearchBar';
import InfoButtonModal from '../../widgets/InfoButtonModal/InfoButtonModal';

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
            <h1
              className='stockdiscoveryRowTitleTop'
              style={{ textAlign: 'center' }}
            >
              Tradable stocks{' '}
              <InfoButtonModal
                title='Tradable stocks'
                info={
                  <div>
                    <p>
                      When you create a game you can restrict the stocks the
                      participants can buy such as restricting which sectors can
                      be traded or what the minimum Environmental, Social or
                      Governance score is. This section aims to make it easier
                      to find stocks that match your game details. Anything you
                      see in this tab is available to buy or sell (Tradable)
                    </p>
                    <p>
                      {' '}
                      The <mark className='bold'>All Stocks</mark> section will
                      show you pages of all the available stocks for your
                      current game.
                    </p>
                    <p>
                      {' '}
                      The <mark className='bold'>Summary</mark> section will
                      show you the top movers and top losers of all the
                      available stocks for your current game.
                    </p>
                    <p>
                      {' '}
                      You can also <mark className='bold'>Search</mark> for
                      stocks and any results shown will be available to trade.
                    </p>
                  </div>
                }
              />
            </h1>
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
          // <Container>
            <Row md={1} xs={1}>
              <GameStocksSummary league={league} />
            </Row>
          // </Container>
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
