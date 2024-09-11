import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function Slider() {
  return (
    <div className="p-4 flex flex-col lg:flex-row w-full h-auto">
      {/* Swiper Slider */}
      <div className="lg:w-3/5 w-full lg:pr-4">
        <Swiper
          spaceBetween={10}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper w-full"
        >
          <SwiperSlide>
            <img
              src="/share.jpg"
              alt="Share promotion"
              className="w-full h-[300px] sm:h-[350px] lg:h-[500px] object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/gold.jpg"
              alt="Gold promotion"
              className="w-full h-[300px] sm:h-[350px] lg:h-[500px] object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/page.jpg"
              alt="Page promotion"
              className="w-full h-[300px] sm:h-[350px] lg:h-[500px] object-contain"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="lg:w-2/5 w-full lg:pl-4 flex flex-col mt-4 lg:mt-0">
        <img
          src="/pages.jpg"
          alt="Pages collection"
          className="w-fit h-[100px] sm:h-[200px] lg:h-[250px] object-cover"
        />
        <img
          src="/getar.jpg"
          alt="Getar collection"
          className="w-fit h-[100px] sm:h-[200px] lg:h-[250px] object-cover"
        />
      </div>
    </div>
  );
}

export default Slider;