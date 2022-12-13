import { Row, Col, Container, Button } from 'react-bootstrap';
import { APIName } from '../../../constants/APIConstants';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import TickerCard from '../tickercard/Tickercard';

function StockSearchResults({ keyword, searchBarError, setSearchBarError, }) {
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
    setError('');
    const getStocks = async () => {
      try {
        setLoading(true);
        let path = `/api/stock?keyword=${keyword}`;
        let queryStringParameters = {
          pageNumber: page,
        };
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
  }, [userToken, keyword, page]);


  useEffect(() => {
    if(searchBarError){
      console.log('error')
      setError(false);
    }
  }, [searchBarError]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error === 'No stocks found for this query' ? (
        <Container>
          <Row>
            <Col className='text-center mx-5'>
              <MessageAlert variant='danger'>{error}. Please try again</MessageAlert>
            </Col>
          </Row>
        </Container>
      ) : error && error !== 'No stocks found for this query' ? (
        <Container>
        <Row>
          <Col className='text-center mx-5'>
            <MessageAlert variant='danger'>{error}</MessageAlert>
          </Col>
        </Row>
      </Container>
      ) : Object.keys(stocks).length !== 0 && (
        <>
          <Container className='py-3'>
            <h3 className='stockdiscoveryRow'>
              Showing Results for "{keyword.trim()}"
            </h3>

            <Row style={{ marginLeft: 'auto', marginRight: 'auto' }}>
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
      )}
    </>
  );
}

export default StockSearchResults;
