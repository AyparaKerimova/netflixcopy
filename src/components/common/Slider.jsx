import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styles from '../../assets/css/Slider.module.css'
export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`mySwiper ${styles.swiper}`}
      >
        <SwiperSlide className={styles.slide}><img src="https://assets.nflxext.com/ffe/siteui/vlv3/56b4aa77-4df4-4f23-8a39-52acc5dc0efa/web_tall_panel/AZ-en-20250127-TRIFECTA-perspective_477c8f22-b55a-4f32-a1ad-e4ccae3af813_large.jpg" alt="" /></SwiperSlide>
        <SwiperSlide className={styles.slide}><img src="https://m.media-amazon.com/images/S/pv-target-images/22e5485e972032754cc1d1f450cefff93d1e546053476cabc45dbcaaf5ec410b._UR1920,1080_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide className={styles.slide}><img src="https://www.monash.edu/__data/assets/image/0019/3046501/EN_SQdGame_Main_PlayGround_Horizontal_RGB_PRE.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
