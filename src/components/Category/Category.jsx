import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // فلترة الفئات بناءً على البحث
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col w-full h-auto">
      {/* عرض الشرائح */}
      <div className="w-full">
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          loop={true} // خاصية التمرير اللانهائي
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          onSlideChange={() => console.log("Slide changed")}
          onSwiper={(swiper) => console.log(swiper)}
          className=""
        >
            {filteredCategories.map((category) => (
              <SwiperSlide
                key={category._id}
                className="bg-white p-2 relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="pb-10">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[150px] sm:h-[200px] lg:h-[250px] object-cover mb-2"
                    onError={(e) => (e.target.src = "placeholder-image-url")}
                  />
                  <h2 className="text-sm font-medium mb-1 text-black text-center">
                    {category.name}
                  </h2>
                </div>
              </SwiperSlide>
            ))}

        </Swiper>
      </div>
    </div>
  );
}
