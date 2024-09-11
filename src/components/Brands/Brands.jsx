import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/Brands');
        const data = await response.json();
        setBrands(data.data);
      } catch (error) {
        setError('Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brand) => {
    MySwal.fire({
      html: (
        <div className="flex justify-between items-center">
          {/* القسم الأيسر لعرض الاسم بالأخضر وتحته الاسم الأسود */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-green-600">{brand.name}</h2>
            <p className="text-sm text-black">{brand.name.toLowerCase()}</p>
          </div>
          {/* القسم الأيمن لعرض الصورة */}
          <img 
            src={brand.image} 
            alt={brand.name} 
            className="w-32 h-32 object-contain" 
          />
        </div>
      ),
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-lg shadow-lg',
        closeButton: 'text-black text-xl',
      },
      width: '400px',
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="brands-page">
      <h1 className="text-center text-2xl font-bold m-10">Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="brand-card border p-4 rounded-lg shadow-md text-center cursor-pointer"
            onClick={() => handleBrandClick(brand)} // عرض التنبيه عند الضغط
          >
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="w-full h-48 object-cover mb-2 rounded"
              onError={(e) => e.target.src = 'placeholder-image-url'}
            />
            <h2 className="font-bold text-lg">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
