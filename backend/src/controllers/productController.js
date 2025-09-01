const Product = require("../models/productModel");

function toInt(v, d = 1) {
  const n = parseInt(v, 10);
  return Number.isInteger(n) && n > 0 ? n : d;
}

exports.getProducts = async (req, res) => {
  const page = toInt(req.query.page, 1);
  const size = toInt(req.query.size, 10);
  const offset = (page - 1) * size;

  const count = await Product.count();
  const totalPages = Math.max(1, Math.ceil(count / size));
  const rows = await Product.getPaged(size, offset);

  res.json({ page, size, totalPages, count, data: rows });
};

exports.createProduct = async (req, res) => {
  await Product.create(req.body.ProductName, req.body.CategoryId);
  res.json({ message: "created" });
};

exports.updateProduct = async (req, res) => {
  await Product.update(
    req.params.id,
    req.body.ProductName,
    req.body.CategoryId
  );
  res.json({ message: "updated" });
};

exports.deleteProduct = async (req, res) => {
  await Product.remove(req.params.id);
  res.json({ message: "deleted" });
};
