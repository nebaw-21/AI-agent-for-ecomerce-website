exports.createOrder = async (req, res) => {
  const { Order } = req.app.locals.models;
  const { product_name, user_id, image_url } = req.body;
  if (!product_name || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const order_id = 'ORD-' + Date.now();
  try {
    const order = await Order.create({
      order_id,
      status: 'Pending',
      user_id,
      product_name,
      image_url
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  const { Order } = req.app.locals.models;
  try {
    const orders = await Order.find().sort({ order_id: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getOrderById = async (req, res) => {
  const { Order } = req.app.locals.models;
  const { order_id } = req.params;
  try {
    const order = await Order.findOne({ order_id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.orderByNameAndPriceRange = async (req, res) => {
  const { Product, Order } = req.app.locals.models;
  const { name, minPrice, maxPrice, user_id } = req.body;
  if (!name || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const min = minPrice !== undefined ? Number(minPrice) : 0;
  const max = maxPrice !== undefined ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
  try {
    // Fuzzy search: case-insensitive partial match
    const regex = new RegExp(escapeRegExp(name), 'i');
    const product = await Product.findOne({
      product_name: { $regex: regex },
      price: { $gte: min, $lte: max }
    });
    if (!product) {
      return res.status(404).json({ error: 'No product found matching criteria' });
    }
    const order_id = 'ORD-' + Date.now();
    const order = await Order.create({
      order_id,
      status: 'Pending',
      user_id,
      product_name: product.product_name,
      image_url: product.image_url
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteOrderByNameFuzzy = async (req, res) => {
  const { Order } = req.app.locals.models;
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }
  try {
    // Fuzzy search: case-insensitive partial match
    const regex = new RegExp(escapeRegExp(name), 'i');
    const result = await Order.deleteMany({ product_name: { $regex: regex } });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
