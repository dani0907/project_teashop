// Import Swiper React components
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

function MainBanner(){
  return(
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 5000 }}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      style={{ height: '400px' }}
    >
      <SwiperSlide>
        <div className='topBox'>
          <div className='thumInner num1'></div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="topBox">
          <div className='thumInner num2'></div>
        </div> 
      </SwiperSlide>
      {/* <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
      ...
    </Swiper>
  )
}



export default MainBanner;