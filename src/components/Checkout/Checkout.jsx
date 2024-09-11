import { useFormik } from "formik";
import React, { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { useNavigate, useParams } from "react-router-dom";

export default function Checkout() {

  let {cartId} = useParams()
  let {cashOnDelivery} = useContext(CartContext)
  let navigate = useNavigate()

  async function pay() {
        console.log(formik.values);
    let url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
    let res = await cashOnDelivery(url,formik.values)
    if (res.status == "success") {
      console.log(res);
      window.location.href = res.session.url
      // navigate('/allOrder')
    } else {
      console.log("Hello",res);
      
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "details",
      phone: "01201670239",
      city: "cairo",
    },
    onSubmit: pay, // تم تغيير 'onsubmit' إلى 'onSubmit'
  });

  return (
    <>
      <div className="w-1000 h-full sm:w-[600px] lg:w-[800px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <h1>Checkout now </h1>
          <div className="mt-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your details
            </label>
            <input
              type="text"
              name="details"
              className="bg-gray-50 border 'border-red-500' 'border-gray-300' text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={formik.values.details}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              type="tel"
              name="phone"
              className="bg-gray-50 border 'border-red-500' 'border-gray-300' text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your city
            </label>
            <input
              type="text"
              name="city"
              className="bg-gray-50 border 'border-red-500' 'border-gray-300' text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Checkout
          </button>
        </form>
      </div>
    </>
  );
}
