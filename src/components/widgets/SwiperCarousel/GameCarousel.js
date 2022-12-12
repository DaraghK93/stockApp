// import Swiper core and required modules
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


SwiperCore.use([Autoplay, Navigation, Pagination]);
const GameCarousel = () => {
  return (
    <div className='swiperComponent'>
      <Swiper
        autoplay={{delay:4000}}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop
        pagination={{ clickable: true }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
      >

        <div className="swiper-wrapper">
          <SwiperSlide>
            <div className="swiperImage">
              <img className="swiperImageActual" src="splash_carousel_1_1.png" alt="" />
            </div>
            <div className="swiper-slide">
              <div className="captionTitle"><h2>Create or Join a Game</h2></div>
              <div className="caption"><p>Create or join a game with custom rules</p></div>
              <div></div>
              <br></br>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_1_2.png" alt="" />
            <div className="swiper-slide">
              <div className="captionTitle"><h2>Explore Stocks</h2></div>
              <div className="caption"><p>Explore stocks with personalised recommendations</p></div>
              <div></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_1_3.png" alt="" />
            <div className="swiper-slide">
              <div className="captionTitle"><h2>Research the best stocks to trade</h2></div>
              <div className="caption"><p>Explore stocks using our advanced A.I. tools</p></div>
              <div></div>
              <br></br>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_1_4.png" alt="" />
            <div className="swiper-slide">
              <div className="captionTitle"><h2>Compete against friends</h2></div>
              <div className="caption"><p>See in real time where you stand against your friends

              </p></div>
              <div></div>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default GameCarousel;
