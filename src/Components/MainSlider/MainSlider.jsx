import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper";
import axios from "axios";

export default function MainSlider() {
  const [products, setproducts] = useState([]);

  async function getProducts() {
    return await axios
      .get(`https://route-ecommerce.onrender.com/api/v1/products`)
      .then((res) => {
        setproducts(res.data.data);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper z-1"
      >
        
        {products?.map((product) => (
          <SwiperSlide key={product.id} className="z-1">
            <img src={product.imageCover} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
