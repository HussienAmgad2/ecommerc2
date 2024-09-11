import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Repeat Password is required"),
    phone: Yup.string()
      .matches(/^(012|010|011|015)\d{8}$/, "Phone number must be valid")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword, // تأكد من تضمين هذا الحقل
          phone: values.phone,
        });

        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error(`An error occurred: ${error.response?.data?.message || "Please try again."}`);
      }
    },
  });

  return (
    <div className="w-500 h-full sm:w-[450px] lg:w-[600px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
      <ToastContainer />
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Register for a new account
        </h5>

        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`bg-gray-50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="name@company.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`bg-gray-50 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Repeat your password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            className={`bg-gray-50 border ${formik.touched.rePassword && formik.errors.rePassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="••••••••"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.rePassword}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`bg-gray-50 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
            placeholder="01234567890"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading..." : "Register"}
        </button>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already registered? <a href="/" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
        </div>
      </form>
    </div>
  );
}
