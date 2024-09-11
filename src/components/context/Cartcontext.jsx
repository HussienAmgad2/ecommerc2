import { createContext, useState } from "react";
import axios from "axios";

const headers = {
  token: localStorage.getItem("token"),
};

function addProductToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error adding product to cart' };
    });
}

function getCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error fetching cart' };
    });
}

function removeProduct(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error removing product from cart' };
    });
}

function updateProductCount(id, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error updating product count' };
    });
}

function clearCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error clearing cart' };
    });
}

function addWishlist(id) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error adding product to wishlist' };
    });
}

function getWishlist() {
  return axios
    .get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error fetching wishlist' };
    });
}

function cashOnDelivery(url, shippingAddress) {
  return axios
    .post(url, { shippingAddress }, { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return { error: 'Error processing cash on delivery' };
    });
}

function removeProductFromWishlist(id) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error('Error removing product from wishlist', err);
      return { error: 'Error removing product from wishlist' };
    });
}

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [cartId, setCartId] = useState(null);
  let [cartItemsNo, setCartItemsNo] = useState(null);

  return (
    <CartContext.Provider value={{
      removeProductFromWishlist,
      getWishlist,
      clearCart,
      cartItemsNo,
      setCartItemsNo,
      cartId,
      setCartId,
      addProductToCart,
      getCart,
      removeProduct,
      addWishlist,
      updateProductCount,
      cashOnDelivery
    }}>
      {children}
    </CartContext.Provider>
  );
}
