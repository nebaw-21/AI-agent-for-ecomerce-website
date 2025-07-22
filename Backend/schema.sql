CREATE TABLE orders (
  order_id TEXT PRIMARY KEY,
  status TEXT,
  user_id TEXT
);

CREATE TABLE shipping (
  tracking_id TEXT PRIMARY KEY,
  status TEXT,
  order_id TEXT
);

CREATE TABLE products (
  product_name TEXT PRIMARY KEY,
  available INTEGER,  -- 0 or 1
  stock INTEGER
);

CREATE TABLE logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  query TEXT,
  response TEXT,
  timestamp TEXT
); 