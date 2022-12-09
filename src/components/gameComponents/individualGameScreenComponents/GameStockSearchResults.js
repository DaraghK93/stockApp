import { Row, Col, Container, Button } from 'react-bootstrap';
import { APIName } from '../../../constants/APIConstants';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import TickerCard from '../../stockDiscoveryComponents/tickercard/Tickercard';

function GameStockSearchResults({ keyword, league }) {
  const [stocks, setStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);

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
        let path = `/api/stock/gameStocks/search/${keyword}`;
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
        if (page > 0) {
          setPage(page - 1);
        }
        console.log(error);
        setError(error.response.data.errormessage);
        setLoading(false);
      }
    };
    getStocks();
  }, [userToken, keyword, league, page]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageAlert variant='danger'>{error}</MessageAlert>
      ) : Object.keys(stocks).length !== 0 ? (
        <>
          <h3 className='stockdiscoveryRow'>
            Showing Results for "{keyword.trim()}"
          </h3>

          <Container className='py-3'>
            <Row>
              {stocks.map((stockObj) => (
                <Col xs={6} md={3} xl={2} className='py-2' key={stockObj._id}>
                  <TickerCard
                    className='text'
                    key={stockObj._id}
                    stock={stockObj}
                  />
                </Col>
              ))}
            </Row>
            <Row className='mx-3'>
              {page > 0 ? (
                <Col className='py-2'>
                  <Button onClick={prev}>Page {page}</Button>
                </Col>
              ) : (
                <Col className='py-2'>
                  <Button
                    disabled={true}
                    onClick={prev}
                    style={{ background: 'white', border: 0 }}
                  >
                    Page {page}
                  </Button>
                </Col>
              )}
              <Col className='py-2 text-center my-auto'>
                <h4>Page {page + 1}</h4>
              </Col>
              {stocks.length === 24 ? (
                <Col className='text-end py-2 my-auto'>
                  <Button onClick={next}>Page {page + 2}</Button>
                </Col>
              ) : (
                <Col className='py-2'>
                  <Button
                    disabled={true}
                    onClick={next}
                    style={{ background: 'white', border: 0 }}
                  >
                    Page {page + 2}
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <MessageAlert variant='danger'>
            No results match your search term "{keyword}"
          </MessageAlert>
        </>
      )}
    </>
  );
}

export default GameStockSearchResults;
