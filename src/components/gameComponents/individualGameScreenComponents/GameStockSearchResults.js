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
        let queryStringParameters = {
          minERating: league.minERating,
          minSRating: league.minSRating,
          minGRating: league.minGRating,
          pageNumber: page,
        };
        for (let i = 0; i < league.sectors.length; i++) {
          queryStringParameters[`sectors[${i}]`] = league.sectors[i];
        }
        let requestConfig = {
          queryStringParameters,
          headers: { 'x-auth-token': userToken },
        };
        const res = await API.get(APIName, path, requestConfig);
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
      ) : error === 'No stocks found for this game' ? (
        <Container>
          <Row>
            <Col className='text-center mx-5'>
              <MessageAlert variant='danger'>
                {
                  <div>
                    <p>
                      Looks like the stock you are looking for cannot be traded
                      in this game
                    </p>
                    <p>Check the details tab for game restrictions</p>
                  </div>
                }
              </MessageAlert>
            </Col>
          </Row>
        </Container>
      ) : error && error !== 'No stocks found for this game' ? (
        <Container>
          <Row>
            <Col className='text-center mx-5'>
              <MessageAlert variant='danger'>{error}</MessageAlert>
            </Col>
          </Row>
        </Container>
      ) : Object.keys(stocks).length !== 0 ? (
        <>
          <h3 className='stockdiscoveryRow'>
            Showing Results for "{keyword.trim()}"
          </h3>

          <Container className='py-3'>
            <Row style={{ marginLeft:"auto", marginRight:"auto"}}>
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
                  <Button onClick={prev}>Back</Button>
                </Col>
              ) : (
                <Col className='py-2'>
                  <Button
                    disabled={true}
                    onClick={prev}
                    style={{ background: 'white', border: 0 }}
                  >
                    Back
                  </Button>
                </Col>
              )}
              <Col className='py-2 text-center my-auto'>
                <h4>Page {page + 1}</h4>
              </Col>
              {stocks.length === 24 ? (
                <Col className='text-end py-2 my-auto'>
                  <Button onClick={next}>Next</Button>
                </Col>
              ) : (
                <Col className='py-2'>
                  <Button
                    disabled={true}
                    onClick={next}
                    style={{ background: 'white', border: 0 }}
                  >
                    Next
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Row>
              <Col className='text-center mx-5'>
                <MessageAlert variant='danger'>
                  No results match your search term "{keyword}"
                </MessageAlert>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default GameStockSearchResults;
