// import Swiper core and required modules
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
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
            <div class="swiper-slide" >
              <div class="captionTitle"><h2>Company specific news feeds</h2></div>
              <div class="caption" ><p>Use our in-built, company specific news feeds from a range of publications to keep up to date with companies and get an advantage over other players in the league.</p></div>
              <div></div>
              <br></br>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_2_2.png" alt="" />
            <div class="swiper-slide">
              <div class="captionTitle"><h2>Sentiment Analysis</h2></div>
              <div class="caption"><p>Use our sentiment analysis tools to see the whether the current sentiment of a company is Positive, Negative or Neutral both on Twitter and across our News Feed.</p></div>
              <div></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_2_3.png" alt="" />
            <div class="swiper-slide">
              <div class="captionTitle"><h2>ESG Investing</h2></div>
              <div class="caption"><p>Use our clear and easy to understand ESG Ratings to help you invest ethically.</p></div>
              <div></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="swiperImageActual" src="splash_carousel_2_4.png" alt="" />
            <div class="swiper-slide">
              <div class="captionTitle"><h2>Learn About the Basics</h2></div>
              <div class="caption"><p>Use our education section to read about the basics of investing and to find more resources for further reading/watching. Use that newfound knowledge to get the upper hand in your league!</p>
              </div>
              <div></div>
              <div></div>
              <br></br>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default IntelligenceCarousel;
