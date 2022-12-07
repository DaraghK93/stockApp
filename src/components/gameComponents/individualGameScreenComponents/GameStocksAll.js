import { Row, Col, Container, Button } from 'react-bootstrap';

import { APIName } from '../../../constants/APIConstants';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../../stockDiscoveryComponents/tickercard/Tickercard';
import { useSelector } from 'react-redux';

function GameStocksAll({ league }) {
  const [stocks, setStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);

  //Redux
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const userToken = userInfo.token;

  function next() {
    if (!error) {
      setPage(page + 1);
    }
  }
  function prev() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    const getStocks = async () => {
      try {
        setLoading(true);
        let path = `/api/stock/gameStocks/all`;
        let body = {
          sectors: league.sectors,
          minERating: league.minERating,
          minSRating: league.minSRating,
          minGRating: league.minGRating,
          pageNumber: page,
        };
        let requestConfig = {
          body,
          headers: { 'x-auth-token': userToken },
        };
        const res = await API.post(APIName, path, requestConfig);

        setStock(res);
        setLoading(false);
        setError('');
      } catch (error) {
        prev();
        console.log(error);
        setError(error.response.data.errormessage);
        setLoading(false);
      }
    };
    getStocks();
  }, [userToken, page]);

  return (
    <>
      <Row className='mx-4'>
        <Col className='py-4'>
          <h2>All stocks - Page {page+1}</h2>
        </Col>
      </Row>
      <Row className='mx-4'>
        <Col className='py-2'>
          <Button onClick={prev}>Previous 20 stocks</Button>
          {'  '}
          <Button onClick={next}>Next 20 stocks</Button>
        </Col>
      </Row>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageAlert variant='danger'>{error}</MessageAlert>
      ) : (
        <>
          <SideScrollMenu>
            {stocks.map((stockObj) => (
              <div className='sideScrollCard' key={stockObj._id}>
                <TickerCard key={stockObj._id} stock={stockObj} />
              </div>
            ))}
          </SideScrollMenu>
          {/* <Button onClick={prev}>Previous</Button>
          <Button onClick={next}>Next</Button>
          <Container style={{ border: 'solid' }}>
            <Row>
              {stocks.map((stockObj) => (
                <Col md={3} className='py-2'>
                  <TickerCard key={stockObj._id} stock={stockObj} />
                </Col>
              ))}
            </Row>
          </Container> */}
        </>
      )}
    </>
  );
}

export default GameStocksAll;
