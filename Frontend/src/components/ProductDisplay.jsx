import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, clearProducts } from '../store/slices/productSlice';

const API_BASE = 'http://localhost:5000';

function ProductDisplay() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderingIdx, setOrderingIdx] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/product/`);
        if (res.ok) {
          const data = await res.json();
          dispatch(setProducts(data.products));
        } else {
          dispatch(clearProducts());
        }
      } catch (err) {
        dispatch(clearProducts());
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleOrder = async (product, idx) => {
    setOrderingIdx(idx);
    setOrderSuccess(false);
    setOrderError('');
    try {
      const res = await fetch(`${API_BASE}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: product.product_name,
          user_id: 'USER1',
          image_url: product.image_url // ensure this is saved in the order
        })
      });
      if (res.ok) {
        setOrderSuccess(true);
        setTimeout(() => setOrderSuccess(false), 2000);
      } else {
        const data = await res.json();
        setOrderError(data.error || 'Order failed');
        setTimeout(() => setOrderError(''), 2000);
      }
    } catch (err) {
      setOrderError('Order failed');
      setTimeout(() => setOrderError(''), 2000);
    }
    setOrderingIdx(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-xl border border-gray-200 shadow hover:shadow-xl transition-shadow duration-200 p-6 group relative"
            >
              <div className="w-full flex justify-center items-center mb-4">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-full object-contain rounded bg-white border border-gray-100 transition-transform duration-200 group-hover:scale-105"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                />
              </div>
              <span className="text-base font-bold text-gray-900 mb-2 text-center line-clamp-2">{product.product_name}</span>
              {product.price && (
                <span className="text-lg text-orange-600 font-extrabold mb-1">${product.price}</span>
              )}
              <span className={`text-xs mb-1 ${product.available ? 'text-green-600' : 'text-red-500'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="text-xs text-gray-500 mb-2">Stock: {product.stock}</span>
              <button
                className="w-full mt-3 px-4 py-2 bg-yellow-400 text-gray-900 text-sm rounded font-bold shadow hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500 transition"
                disabled={!product.available || orderingIdx !== null}
                onClick={() => handleOrder(product, idx)}
              >
                {orderingIdx === idx ? 'Ordering...' : 'Order'}
              </button>
            </div>
          ))}
        </div>
        {/* Success/Error messages */}
        {orderSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow z-50">
            Order placed successfully!
          </div>
        )}
        {orderError && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-4 py-2 rounded shadow z-50">
            {orderError}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDisplay;