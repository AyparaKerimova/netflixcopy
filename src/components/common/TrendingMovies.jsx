import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const TrendingMovies = () => {
  return (
    <>
        <Swiper
        slidesPerView={7}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mt-16"
      >
        
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-clementoni-1000-pieces-netflix-squid-game.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BNjU2ODA5MWQtNGE1My00MWRiLThkMWQtMmU3ZWFhOGYzYzE2XkEyXkFqcGc@._V1_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BZjkxZWJiNTUtYjQwYS00MTBlLTgwODQtM2FkNWMyMjMwOGZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BMTg5N2U4ZTItMjc2NC00NDg2LWIzODYtOWZmNzY5Yzc5MzUxXkEyXkFqcGc@._V1_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://www.fsunews.com/gcdn/presto/2023/01/15/PFSU/2821e7df-1732-4157-9904-72938c88bba0-alice_in_borderland.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BN2FkMTRkNTUtYTI0NC00ZjI4LWI5MzUtMDFmOGY0NmU2OGY1XkEyXkFqcGc@._V1_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://static.boxofficeturkiye.com/movie/poster/300x429/88/2016988-62635776.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BNjU2ODA5MWQtNGE1My00MWRiLThkMWQtMmU3ZWFhOGYzYzE2XkEyXkFqcGc@._V1_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BZjkxZWJiNTUtYjQwYS00MTBlLTgwODQtM2FkNWMyMjMwOGZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img style={{height:"220px"}} className='rounded' width={200} src="https://m.media-amazon.com/images/M/MV5BMTg5N2U4ZTItMjc2NC00NDg2LWIzODYtOWZmNzY5Yzc5MzUxXkEyXkFqcGc@._V1_.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  )
}

export default TrendingMovies