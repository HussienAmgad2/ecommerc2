import React from "react";
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Product from "./components/Products/Product";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/Products/Product";
import WishList from "./components/Wish-list/Wish-list";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./components/NavBar/AuthContext";
import Checkout from "./components/Checkout/Checkout";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserTokenContextProvider from "./components/context/UserTokenContext";
import CartContextProvider from "./components/context/Cartcontext";
import Order from "./components/order/order";
import Verification from "./pages/Verification";

function App() {
  return (
    <UserTokenContextProvider>
      <AuthProvider>
        <CartContextProvider>
          <Router>
            <NavBar />
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/verification" element={<Verification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/forgot-password" element={<ResetPassword />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wish-list"
                  element={
                    <ProtectedRoute>
                      <WishList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout/:cartId"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/allorders"
                  element={
                    <ProtectedRoute>
                      <Order />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product"
                  element={
                    <ProtectedRoute>
                      <Product />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/brands"
                  element={
                    <ProtectedRoute>
                      <Brands />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product/:productId"
                  element={
                    <ProtectedRoute>
                      <ProductDetails />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </CartContextProvider>
      </AuthProvider>
      <ToastContainer />
    </UserTokenContextProvider>
  );
}

export default App;
