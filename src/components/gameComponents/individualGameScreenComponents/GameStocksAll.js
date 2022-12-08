import { Row, Col, Button } from 'react-bootstrap';

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
        if (page > 0) {
          setPage(page - 1);
        }
        console.log(error);
        setError(error.response.data.errormessage);
        setLoading(false);
      }
    };
    getStocks();
  }, [userToken, page, league]);

  return (
    <>
      <Row className='mx-4'>
        <Col className='py-4 text-center'>
          <h2>Page {page + 1}</h2>
        </Col>
      </Row>
      <Row className='mx-4'>
        {page > 0 && (
          <Col className='py-2'>
            <Button onClick={prev}>To page {page}</Button>
          </Col>
        )}
        <Col className='text-end py-2'>
          <Button onClick={next}>To page {page + 2}</Button>
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
        </>
      )}
    </>
  );
}

export default GameStocksAll;
