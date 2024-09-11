import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { toast, ToastContainer } from 'react-toastify';  // استيراد Toastify
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../context/Cartcontext';

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false); // حالة للقلب
  const { addProductToCart, addWishlist, getWishlist } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        setProduct(data.data);
      } catch (error) {
        setError('Error fetching product details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    async function checkWishlist() {
      try {
        const { data } = await getWishlist();
        setIsWishlist(data.some(item => item.id === productId)); // تحقق مما إذا كان المنتج في قائمة التمني
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    if (productId) {
      checkWishlist();
    }
  }, [productId, getWishlist]);

  function addtocart(id) {
    addProductToCart(id).then(res => {
      if (res.error) {
        toast.error('Failed to add product to cart'); // إشعار فشل
      } else {
        toast.success('Product added to cart!'); // إشعار نجاح
      }
    }).catch(() => {
      toast.error('Failed to add product to cart'); // إشعار خطأ
    });
  }

  function addtowhishlist(id) {
    addWishlist(id).then(res => {
      console.log('Response:', res); // تحقق من الاستجابة
      if (res.status == 'success') {
        setIsWishlist(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }).catch(() => {
      toast.error(res.message);
    });
  }
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-start md:items-center justify-between">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      {/* Image Slider */}
      <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
        <Swiper
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper w-full"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={product.title} className="w-full object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Information */}
      <div className="w-full md:w-2/3 md:pl-8">
        <h2 className="text-2xl font-bold mb-1 text-left">{product.title}</h2>
        <p className="text-sm text-gray-500 mb-4 text-left">{product.description}</p>
        <p className="text-lg font-semibold mb-4 text-left">{product.price} EGP</p>
        <div className="flex flex-col md:flex-row items-start">
          <button
            onClick={() => addtocart(product.id)} // اضف المنتج إلى السلة عند الضغط
            className="bg-green-500 w-full hover:bg-green-600 text-white py-2 px-8 rounded text-lg mb-4 md:mb-0"
          >
            + Add
          </button>
          <div className="flex flex-col items-center md:items-start md:ml-5 mt-[-45px]">
            <span className="text-yellow-500 text-lg mb-1">
              <i className="fas fa-star"></i> {product.ratingsAverage}
            </span>
            <button
              className={`bg-white text-2xl ${isWishlist ? 'text-red-500' : 'text-black'}`} // تغيير اللون بناءً على الحالة
              onClick={() => addtowhishlist(product.id)}
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
