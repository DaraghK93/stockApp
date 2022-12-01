import Carousel from 'react-bootstrap/Carousel';

function SplashCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://picsum.photos/200'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Create or join a game</h3>
            <p>Create or join a game with custom rules</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://picsum.photos/200'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Explore stocks</h3>
            <p>Explore a wide range of stocks with personalised recommendations</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://picsum.photos/200'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Research the best stocks to trade</h3>
            <p>Explore stocks using our advanced artificial intellingce</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://picsum.photos/200'
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Compete against friends</h3>
            <p>
              See in real time where you stand against others
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default SplashCarousel;
