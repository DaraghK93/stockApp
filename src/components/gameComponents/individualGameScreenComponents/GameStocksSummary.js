import { APIName } from '../../../constants/APIConstants';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import LoadingSpinner from '../../widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';
import SideScrollMenu from '../../widgets/SideScrollMenu/SideScrollMenu';
import TickerCard from '../../stockDiscoveryComponents/tickercard/Tickercard';
import { useSelector } from 'react-redux';

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
        <MessageAlert variant='danger'>{error}</MessageAlert>
      ) : (
        <>
          <h3 className='stockdiscoveryRow'>Today's Biggest Positive Movers</h3>
          <SideScrollMenu>
            {stocks[0].topGainers.map((stockObj) => (
              <div className='sideScrollCard' key={stockObj._id}>
                <TickerCard key={stockObj._id} stock={stockObj} />
              </div>
            ))}
          </SideScrollMenu>

          <h3 className='stockdiscoveryRow'>Today's Biggest Negative Movers</h3>
          <SideScrollMenu>
            {stocks[0].topLosers.map((stockObj) => (
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

export default GameStocksSummary;
