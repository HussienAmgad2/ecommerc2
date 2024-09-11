import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../Slider/Slider";
import Category from "../Category/Category";
import Products from "../Products/Products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // حالة البحث

  // الحصول على المنتجات
  async function getProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      setError("Error fetching products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // دالة لتصفية المنتجات
  const filteredProducts = products.filter(
    (product) =>
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Slider products={products} />
      <Category products={products} searchTerm={searchTerm} />

      <Products />
    </div>
  );
}
