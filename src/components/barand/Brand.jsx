import React, { useEffect, useState } from 'react';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
        const data = await response.json();
        setBrands(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch brands", error);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="brands-page">
      <h1 className="text-center text-2xl font-bold">Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-card">
            <img src={brand.logo} alt={brand.name} />
            <h2>{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
