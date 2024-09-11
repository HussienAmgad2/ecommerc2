import React, { useState, useEffect, useContext } from "react";
import { RotatingTriangles } from "react-loader-spinner"; // تأكد من تثبيت react-loader-spinner
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let { getCart, setCartItemsNo, removeProduct, updateProductCount, setCartId, cartId, clearCart } =
    useContext(CartContext);
  let [cartInfo, setCartInfo] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [noCartInfo, setNoCartInfo] = useState(null); // تعديل هنا
  let navigate = useNavigate();

  useEffect(() => {
    getCartInfo();
  }, []);

  async function getCartInfo() {
    setIsLoading(true); // فعل حالة التحميل
    let res = await getCart();
    setCartId(res.data._id);
    setCartInfo(res);
    setCartItemsNo(res.data.cartItemsNo)
    setIsLoading(false); // تعطيل حالة التحميل
  }

  async function handleRemoveProduct(id) {
    let res = await removeProduct(id);
    console.log(res);
    setCartInfo(res);
  }

  async function updateProduct(id, count) {
    let res = await updateProductCount(id, count);
    console.log(res);
    setCartInfo(res);
  }

  async function clearAllCart() {
    let res = await clearCart();
    console.log(res);
    if (res.message === "success") { // تعديل هنا
      setNoCartInfo("Your Cart Is Empty");
    }
    setCartInfo(null); // تعديل هنا
  }

  function gotoCheckOut() {
    navigate(`/checkout/${cartId}`);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : noCartInfo ? (
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold text-gray-600">
            {noCartInfo}
          </h2>
        </div>
      ) : cartInfo?.data?.products?.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is empty
          </h2>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className="text-4xl text-green-500 font-bold text-center mt-5">
            Shopping Cart
          </h1>
          <div className="flex justify-between px-7 my-6">
            <h2 className="text-gray-600 text-2xl">
              Total Cart Items : {cartInfo.numOfCartItems}
            </h2>
            <h2 className="text-green-600 text-2xl">
              Total Price : {cartInfo.data.totalCartPrice}{" "}
            </h2>
          </div>
          <table className="w-full my-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price of Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Total price of Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartInfo.data.products
                .filter((ele) => ele.count !== 0)
                .map((ele) => (
                  <tr
                    key={ele._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={ele.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={ele.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {ele.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() =>
                            updateProduct(ele.product.id, ele.count - 1)
                          }
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>{ele.count}</span>
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          onClick={() =>
                            updateProduct(ele.product.id, ele.count + 1)
                          }
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {ele.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {ele.price * ele.count}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium bg-white text-red-600 dark:text-red-500"
                        onClick={() => handleRemoveProduct(ele.product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="w-full flex"> 
            <button
              className="btn w-full bg-green-500 text-white"
              onClick={clearAllCart}
            >
              Clear your Cart
            </button>
            <button
              className="btn w-full bg-blue-500 text-white"
              onClick={gotoCheckOut}
            >
              Continue to CheckOut
            </button>
          </div>
        </div>
      )}
    </>
  );
}
