// import React, { useEffect, useState } from 'react';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
//         const data = await response.json();
//         setCategories(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="categories-page">
//       <h1 className="text-center text-2xl font-bold">Categories</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {categories.map((category) => (
//           <div key={category.id} className="category-card">
//             <img src={category.image} alt={category.name} />
//             <h2>{category.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from 'react'

export default function Category() {
  return (
    <div>
      Category
    </div>
  )
}
