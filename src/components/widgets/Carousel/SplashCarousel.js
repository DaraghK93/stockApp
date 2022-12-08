import Carousel from 'react-bootstrap/Carousel';
function SplashCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Splashpage_Carousel_1.png'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Create or Join a Game</h3>
            <p>Create or join a game with custom rules</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Splashpage_Carousel_2.png'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Explore Stocks</h3>
            <p>Explore stocks with personalised recommendations</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Splashpage_Carousel_3.png'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Research the best stocks to trade</h3>
            <p>Explore stocks using our advanced A.I. tools</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/Splashpage_Carousel_4.png'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Compete against friends</h3>
            <p>
              See in real time where you stand against your friends
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default SplashCarousel;
