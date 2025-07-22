exports.getAllProducts = async (req, res) => {
  const { Product } = req.app.locals.models;
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductByName = async (req, res) => {
  const { Product } = req.app.locals.models;
  const { name } = req.params;
  try {
    const product = await Product.findOne({ product_name: name });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
