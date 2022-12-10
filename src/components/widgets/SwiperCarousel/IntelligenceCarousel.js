// import Swiper core and required modules
import React from 'react'
import { Swiper, SwiperSlide, Scrollbar } from "swiper/react"
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


SwiperCore.use([Autoplay, Navigation, Pagination]);
const IntelligenceCarousel = () => {
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
        // style={{ maxWidth: "20rem" }}
      // breakpoints={{
      //   // when window width is >= 640px
      //   640: {
      //     width: 640,
      //     slidesPerView: 1,
      //   },
      //   // when window width is >= 768px
      //   768: {
      //     width: 768,
      //     slidesPerView: 1,
      //   },
      // }}
      >

        <div className="swiper-wrapper">
          <SwiperSlide>
            <div class="swiperImage">
              <img className="swiperImageActual" src="splash_carousel_2_1.png" alt="" />
            </div>
            <div class="swiper-slide">
              <div class="captionTitle"><h2>Create or Join a Game</h2></div>
              <div class="caption"><p>Create or join a game with custom rules</p></div>
              <div></div>
              <br></br>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_2_2.png" alt="" />
            <div class="swiper-slide">
              <div class="captionTitle"><h2>Explore Stocks</h2></div>
              <div class="caption"><p>Explore stocks with personalised recommendations</p></div>
              <div></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_2_3.png" alt="" />
            <div class="swiper-slide">
              <div class="captionTitle"><h2>Research the best stocks to trade</h2></div>
              <div class="caption"><p>Explore stocks using our advanced A.I. tools</p></div>
              <div></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_2_4.png" alt="" />
            <div class="swiper-slide">
              <div class="captionTitle"><h2>Compete against friends</h2></div>
              <div class="caption"><p>See in real time where you stand against your friends

              </p></div>
              <div></div>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default IntelligenceCarousel;
