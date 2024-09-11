import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/Cartcontext"; // تأكد من مسار استيراد CartContext

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]); // حالة لقائمة التمني
  const { addProductToCart, addWishlist, getWishlist } =
    useContext(CartContext); // استخدم CartContext من React Context API

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(data.data);
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await getWishlist(); // استرجاع قائمة التمني من API
        setWishlist(data.map((item) => item.id)); // تأكد من أن قائمة التمني تحتوي على المعرفات فقط
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [getWishlist]);

  const filteredProducts = products.filter(
    (product) =>
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAddToCart(product) {
    addProductToCart(product.id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Product added to cart!");
        }
      })
      .catch((err) => {
        console.error("Error adding product to cart:", err);
        toast.error("Failed to add product to cart");
      });
  }

  function handleAddToWishlist(productId) {
    addWishlist(productId)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Product added to wishlist!");
          // تحديث حالة قائمة التمني بعد الإضافة
          setWishlist([...wishlist, productId]);
        }
      })
      .catch((err) => {
        console.error("Error adding product to wishlist:", err);
        toast.error("Failed to add product to wishlist");
      });
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Search by category or title..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="text-3xl font-semibold mb-6 text-black">
        Shop Popular Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          filteredProducts.map((product) => (
            <Link className="bg-white p-6 rounded relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg group">
              <Link to={`/product/${product.id}`} key={product.id}>
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-72 object-cover mb-6"
                />

                <h3 className="text-xl font-medium mb-4 text-yellow-500">
                  {product.category.name}
                </h3>
                <h3 className="text-xl font-medium mb-4 text-black">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="text-yellow-500 mb-4 flex items-center">
                  <i className="fas fa-star mt-0.5 mr-2 text-lg"></i>
                  <h3 className="text-lg text-black">
                    {product.ratingsAverage}
                  </h3>
                </div>
              </Link>

              <div className="flex items-center justify-between mb-6">
                <p className="text-xl text-gray-600">{product.price} EGP</p>
                <span className="text-black cursor-pointer text-xl">
                  <button
                    className={`bg-white ${
                      wishlist.includes(product.id)
                        ? "text-red-500"
                        : "text-green-800"
                    }`}
                    onClick={() => {
                      handleAddToWishlist(product.id);
                    }}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product); // استخدم الدالة المعدلة
                }}
                className="bg-green-600 text-white text-lg w-full py-3 rounded transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                + Add
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
