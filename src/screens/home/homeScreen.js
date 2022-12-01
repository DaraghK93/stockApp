/// Home Screen ///
// Route:
//  <URL>/home
// Description:
//  This screen contains the components redenred to the user when they first visit the page

/// Imports ///
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

//import TickerCard from '../../components/stockDiscoveryComponents/tickercard/Tickercard';
import NewsArticleCard from '../../components/newsComponents/newsArticleCard/NewsArticleCard';
import ChartCardESG from '../../components/stockVisualisationComponents/ChartCard/ChartCard(ESG)';
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';

function HomeScreen() {
  const navigate = useNavigate();

  /// When user clicks "Play" button
  const navigateLogin = (e) => {
    e.preventDefault();
    navigate(`/login`);
  };

  var articles = [
    {
      headline:
        "Rees-Mogg argues pensions 'aren't at risk' despite BoE warnings",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://e3.365dm.com/22/10/70x70/skynews-jacob-rees-mogg-fringe_5919846.jpg?20221004130943',
      pubDate: '2022-10-12T06:22:00.000+00:00',
      sentiment: 'negative',
    },
    {
      headline:
        "Rees-Mogg argues pensions 'aren't at risk' despite BoE warnings",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://e3.365dm.com/22/10/70x70/skynews-jacob-rees-mogg-fringe_5919846.jpg?20221004130943',
      pubDate: '2022-10-12T06:22:00.000+00:00',
      sentiment: 'negative',
    },
    {
      headline:
        "Rees-Mogg argues pensions 'aren't at risk' despite BoE warnings",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://e3.365dm.com/22/10/70x70/skynews-jacob-rees-mogg-fringe_5919846.jpg?20221004130943',
      pubDate: '2022-10-12T06:22:00.000+00:00',
      sentiment: 'negative',
    },
    {
      headline:
        "Rees-Mogg argues pensions 'aren't at risk' despite BoE warnings",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://e3.365dm.com/22/10/70x70/skynews-jacob-rees-mogg-fringe_5919846.jpg?20221004130943',
      pubDate: '2022-10-12T06:22:00.000+00:00',
      sentiment: 'negative',
    },
  ];

  //var images = [];

  const stockSentimentData = [
    { name: 'Positive', value: 100 },
    { name: 'Negative', value: 98 },
    { name: 'Neutral', value: 26 },
  ];

  return (
    <>
      <Container className='splash-page-container'>
        <Row className='py-4'>
          <Col className='mx-4'>
            <h1>FinOptimse - Fantasy Stock Trading Game</h1>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <Button onClick={navigateLogin}>Play Now</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Cool picture here</p>
          </Col>
        </Row>
      </Container>
      <Row className='py-3 banner'>
      </Row>
      <Container className='splash-page-container'>
        <Row className='py-3'>
          <Col>
            <h2>About the Game</h2>
          </Col>
        </Row>
        <Row>
          <Col className='mx-5'>
            <p>
              Create a league, invite your friends, test your skills, Research
              stocks to get ahead. Use our advanced artificial intelligence
              models to analyse the news and twitter to see if sentiment is
              positive negative or neutral. Get personalised stock
              recommendations based on your previous trades
            </p>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <h2>Stock Leagues</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Some text here that describes the game well. Maybe add a picture
              too
            </p>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <Button onClick={navigateLogin}>Create a league now</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='py-3'>
          <Col>
            <h2 style={{ textAlign: 'center' }}>Intelligent Components</h2>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <p style={{ textAlign: 'center' }}>
              There is a News feed and Twitter feed for each stock where each article/tweet is classified into
              positive negative or neutral by our advanced AI
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} className='offset-md-2'>
            <Card id='newsCardContainer' className='newsCardContainer'>
              <h2 className='newsCardContainerHeading'>News Feed</h2>
              <Card.Body className='newsCardContainerBody'>
                <>
                  <Row xs={1} md={1}>
                    {articles.map((article) => (
                      <Col key={`${article.link}`} className='pb-3'>
                        <NewsArticleCard article={article} />
                      </Col>
                    ))}
                  </Row>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            <p style={{ textAlign: 'center' }}>Sentiment breakdown for each stock</p>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} className='stockInfoCol offset-md-2'>
            <ChartCard title={'News Sentiment'} data={stockSentimentData} />
          </Col>
        </Row>
        <Row></Row>
        <Row className='py-3'>
          <Col>
            <p style={{ textAlign: 'center' }}>
              Some text here that describes the game well. Maybe add a picture
              too
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='py-3'>
          <Col>
            <h2 style={{ textAlign: 'center' }}>
              Environmenatal Social and Governance (ESG) Investing
            </h2>
          </Col>
        </Row>
        {/* <TickerCard key={} stock={} /> */}
        <Row>
          <Col>
            <p style={{ textAlign: 'center' }}>
              See at a glance how your stock ranks in terms of ESG.
            </p>
          </Col>
        </Row>
        <Row className='esg-row' style={{ alignItems: 'center' }}>
          <Col sm md={8} className='stockInfoCol offset-md-2'>
            <ChartCardESG title={'ESG Rating'} edata={3} sdata={2} gdata={1} />
          </Col>
        </Row>
      </Container>
      <Container className='footer'>
        <p>Here is all the info for the footer</p>
        <p>FinOptimise all rights reserved. Not financial advice</p>
      </Container>
    </>
  );
}

export default HomeScreen;
