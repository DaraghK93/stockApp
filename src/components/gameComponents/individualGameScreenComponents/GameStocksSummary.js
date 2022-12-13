import { APIName } from '../../../constants/APIConstants';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../../stockDiscoveryComponents/tickercard/Tickercard';
import { useSelector } from 'react-redux';

import { Row, Col, Container } from 'react-bootstrap';

function GameStocksSummary({ league }) {
  const [stocks, setStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Redux
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const userToken = userInfo.token;

  useEffect(() => {
    const getStocks = async () => {
      try {
        setLoading(true);

        let path = `/api/stock/gameStocks/summary`;
        let queryStringParameters = {
          sectors: league.sectors,
          minERating: league.minERating,
          minSRating: league.minSRating,
          minGRating: league.minGRating,
        };
        let requestConfig = {
          queryStringParameters,
          headers: { 'x-auth-token': userToken },
        };
        const res = await API.get(APIName, path, requestConfig);
        setStock(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response.data.errormessage);
        setLoading(false);
      }
    };
    getStocks();
  }, [userToken, league]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Container>
          <Row>
            <Col className='text-center mx-5'>
              <MessageAlert variant='danger'>{error}</MessageAlert>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <h3 className='stockdiscoveryRow'>Today's Biggest Positive Movers</h3>
          {stocks[0].topGainers.length > 0 ? (
            <SideScrollMenu>
              {stocks[0].topGainers.map((stockObj) => (
                <div className='sideScrollCard' key={stockObj._id}>
                  <TickerCard key={stockObj._id} stock={stockObj} />
                </div>
              ))}
            </SideScrollMenu>
          ) : (
            <Container>
              <Row>
                <Col className='text-center mx-5'>
                  <MessageAlert variant='info'>
                    No gainers to show. Lots of companies in the red today, stay
                    safe out there
                  </MessageAlert>
                </Col>
              </Row>
            </Container>
          )}

          <h3 className='stockdiscoveryRow'>Today's Biggest Negative Movers</h3>
          {stocks[0].topLosers.length > 0 ? (
            <SideScrollMenu>
              {stocks[0].topLosers.map((stockObj) => (
                <div className='sideScrollCard' key={stockObj._id}>
                  <TickerCard key={stockObj._id} stock={stockObj} />
                </div>
              ))}
            </SideScrollMenu>
          ) : (
            <Container>
              <Row>
                <Col className='text-center mx-5'>
                  <MessageAlert variant='info'>
                    No top losers to show. You couldn't lose money today if you
                    tried but you still probably will.
                  </MessageAlert>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default GameStocksSummary;
