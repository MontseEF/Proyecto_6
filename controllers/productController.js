const Product = require('../models/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description = '', price } = req.body;
    if (!name || price == null) return res.status(400).json({ error: 'nombre y precio son obligatorios' });

    const product = await Product.create({
      name, description, price, owner: req.user.id
    });
    res.status(201).json({ message: 'Producto creado', product });
  } catch (err) { next(err); }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('owner', 'name email');
    res.json(products);
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).populate('owner', 'name email');
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(p);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
    if (String(p.owner) !== req.user.id) return res.status(403).json({ error: 'No autorizado' });

    const { name, description, price } = req.body;
    if (name !== undefined) p.name = name;
    if (description !== undefined) p.description = description;
    if (price !== undefined) p.price = price;
    await p.save();
    res.json({ message: 'Producto actualizado', product: p });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
    if (String(p.owner) !== req.user.id) return res.status(403).json({ error: 'No autorizado' });

    await p.deleteOne();
    res.json({ message: 'Producto eliminado' });
  } catch (err) { next(err); }
};
