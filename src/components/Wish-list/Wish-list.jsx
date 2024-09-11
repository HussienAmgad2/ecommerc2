import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/Cartcontext';
import { toast } from 'react-toastify'; // استيراد toast

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getWishlist, removeProductFromWishlist, addProductToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        setLoading(true);
        const response = await getWishlist();
        if (response.error) {
          setError(response.error);
        } else {
          setWishlist(response.data);
        }
      } catch (err) {
        setError('Error fetching wishlist');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [getWishlist]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl text-blue-500 font-bold text-center mt-5">Wish List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {wishlist.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Price (EGP)</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium bg-gray-30 text-red-600 dark:text-red-500"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="font-medium bg-green-300 text-green-600 dark:text-green-500 ml-4"
                      onClick={() => handleAddToCart(item._id)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-4">You don't have any favorite products</div>
        )}
      </div>
    </div>
  );

  async function handleRemoveFromWishlist(id) {
    try {
      await removeProductFromWishlist(id);
      setWishlist(wishlist.filter(item => item._id !== id));
      toast.success('Product removed from wishlist'); // إضافة إشعار عند إزالة المنتج
    } catch (err) {
      console.error('Error removing from wishlist', err);
      setError('Failed to remove item from wishlist');
      toast.error('Failed to remove item from wishlist'); // إشعار عند حدوث خطأ
    }
  }

  async function handleAddToCart(productId) {
    try {
      await addProductToCart(productId);
      console.log('Product added to cart');
      toast.success('Product added to cart'); // إضافة إشعار عند إضافة المنتج
    } catch (err) {
      console.error('Error adding to cart', err);
      toast.error('Failed to add product to cart'); // إشعار عند حدوث خطأ
    }
  }
}
