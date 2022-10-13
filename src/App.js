import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/header';
import RegistrationPage from './screens/registration/registrationScreen';
import LoginPage from './screens/login/loginscreen';
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';
import StockPage from './screens/stockpage/StockPage';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import TwitterFeed from './screens/TwitterFeed/TwitterFeed';

function App() {
  return (
    // <>
    //   <div>
    //     <TwitterTweetEmbed tweetId={'1580112905705787392'} />
    //     <TwitterTweetEmbed tweetId={'1580137809544769539'} />
    //     <TwitterTweetEmbed tweetId={'1580136679377338370'} />
    //     <TwitterTweetEmbed tweetId={'1580121369932488705'} />
    //     <TwitterTweetEmbed tweetId={'1580056072764608513'} />
    //     <TwitterTweetEmbed tweetId={'1580027349101223936'} />
    //   </div>
    // </>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<RegistrationPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/stockdiscovery' element={<StockDiscoveryPage />} />
        <Route path='/stock/:symbol' element={<StockPage />} />
        <Route path='/twitterfeed' element={<TwitterFeed />} />
      </Routes>
    </Router>
  );
}
export default App;
