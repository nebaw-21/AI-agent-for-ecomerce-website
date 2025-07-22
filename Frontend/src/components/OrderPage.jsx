import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000';

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/order`);
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <a href="/" className="text-blue-600 hover:underline text-sm">&larr; Back to Products</a>
        </div>
        <h2 className="text-2xl font-bold mb-6">Order History</h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600">No orders found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {orders.map((order, idx) => (
              <div
                key={idx}
                className="bg-white rounded-md shadow p-4 flex flex-col items-center border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={order.image_url}
                  alt={order.product_name}
                  className="w-28 h-28 object-cover rounded mb-2 border"
                />
                <span className="font-semibold text-gray-800 mb-1">{order.product_name}</span>
                <span className="text-xs text-gray-500 mb-1">Order ID: {order.order_id}</span>
                <span className={`text-xs mb-1 ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                  Status: {order.status}
                </span>
                <span className="text-xs text-gray-500 mb-1">User: {order.user_id}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;