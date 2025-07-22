import React from 'react';

function ProductCard({ product }) {
  if (!product) return null;
  return (
    <div className="bg-gray-800 rounded-lg p-6 my-4 shadow-md text-left max-w-xs">
      <h3 className="text-lg font-semibold mb-2 text-white">{product.product_name}</h3>
      <div className="flex items-center gap-4">
        <span className={`font-bold ${product.available ? 'text-green-400' : 'text-red-500'}`}>
          {product.available ? 'Available' : 'Out of Stock'}
        </span>
        <span className="text-gray-400">Stock: {product.stock}</span>
      </div>
    </div>
  );
}

export default ProductCard; 