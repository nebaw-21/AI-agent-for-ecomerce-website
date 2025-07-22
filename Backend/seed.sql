INSERT INTO orders (order_id, status, user_id) VALUES
  ('ORD123', 'Shipped', 'USER1'),
  ('ORD124', 'Delivered', 'USER2'),
  ('ORD125', 'Processing', 'USER1');

INSERT INTO shipping (tracking_id, status, order_id) VALUES
  ('TRK123', 'In Transit', 'ORD123'),
  ('TRK124', 'Delivered', 'ORD124');

INSERT INTO products (product_name, available, stock) VALUES
  ('Wireless Mouse', 1, 25),
  ('Bluetooth Keyboard', 1, 10),
  ('USB-C Cable', 0, 0);

INSERT INTO logs (user_id, query, response, timestamp) VALUES
  ('USER1', 'Where is my order ORD123?', 'Your order ORD123 has been shipped.', '2024-06-01T10:00:00Z'),
  ('USER2', 'Is my order ORD124 delivered?', 'Your order ORD124 has been delivered.', '2024-06-01T11:00:00Z'); 