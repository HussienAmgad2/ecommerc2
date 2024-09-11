import React, { useEffect, useState } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        setError('Failed to fetch categories');
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
  };

  // Define subcategories for each category
  const subcategories = {
    'Men\'s Fashion': ['Bags & luggage', 'Men\'s Clothing'],
    'Women\'s Fashion': ['Kid\'s Fashion', 'Handbags', 'Eyewear', 'Jewellery', 'Watches', 'Footwear', 'Women\'s Clothing'],
    'SuperMarket': ['Pet Supplies', 'Candy & Chocolate', 'Baby Food', 'Breakfast Food', 'Snack Food', 'Home Care & Cleaning', 'Beverages', 'Canned Dry and Packaged Foods'],
    'Baby & Toys': ['Toys', 'Potty Training', 'Bouncers & Swings', 'Car Seats & Strollers', 'Nursing & Feeding', 'Bathing & Skin Care', 'Diapers & Diaper Bags', 'Baby Safety Products'],
    'Home': ['Kitchen & Dining', 'Home Decor', 'Furniture', 'Tools & Home Improvement', 'Bath & Bedding', 'Drinkware', 'Cookware', 'Large Appliances', 'Home Appliances'],
    'Beauty & Health': ['Health & Nutrition', 'Personal Care', 'Skin Care', 'Hair Care', 'Makeup', 'Fragrance'],
    'Mobiles': ['Mobile Gaming & VR Gadgets', 'Covers & Screen protectors', 'Chargers & Cables', 'Power Banks', 'Earphones', 'Wireless Earphones', 'Smartwatches & Accessories', 'All Tablets', 'All Mobile Phones', 'Mobile New Arrivals'],
    'Electronics': ['Computer Accessories', 'Computer Components', 'Data Storage', 'Networking Products', 'Printers & Accessories', 'Cameras & Accessories', 'Video Games', 'Audio & Home Entertainment', 'Laptops & Accessories', 'TVs', 'Satellites & Accessories'],
  };

  return (
    <div className="categories-page">
      <h1 className="text-center text-2xl font-bold m-10">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="category-card border p-4 rounded-lg shadow-md text-center cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-[350px] lg:h-[420px] object-cover mb-2 rounded"
              onError={(e) => e.target.src = 'placeholder-image-url'} 
            />
            <h2 className="font-bold text-lg text-green-600">{category.name}</h2>
          </div>
        ))}
      </div>

      {/* عرض اسم الفئة المختارة و subcategories */}
      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center text-hussien-green">
            {selectedCategory} subcategories
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategories[selectedCategory]?.map((subcategory, index) => (
              <div
                key={index}
                className="subcategory-card border p-4 rounded-lg shadow-md text-center"
              >
                <p className="text-lg font-semibold">{subcategory}</p>
              </div>
            )) || <p></p>}
          </div>
        </div>
      )}
    </div>
  );
}
