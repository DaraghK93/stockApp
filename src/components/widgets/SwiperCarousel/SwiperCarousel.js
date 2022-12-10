// import Swiper core and required modules
import React from 'react'
import {Swiper, SwiperSlide, Scrollbar} from "swiper/react"
import SwiperCore, {Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


SwiperCore.use([Autoplay, Navigation, Pagination]);
const Carousel = () => {
  return (
    <Swiper
      autoplay={{delay:3000}}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
      }}
    >
        <SwiperSlide>
        <img src="splash_carousel_1_1.png" alt="" />
        <div class="swiper-slide">
          <div class="captionTitle"><h2>Create or Join a Game</h2></div>
          <div class="caption"><p>Create or join a game with custom rules</p></div>
          <div></div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="splash_carousel_1_2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="splash_carousel_1_3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="splash_carousel_1_4.png" alt="" />
        </SwiperSlide>
      ...
    </Swiper>
  );
};

export default Carousel;
