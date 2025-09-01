const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  const data = await Category.getAll();
  res.json(data);
};

exports.createCategory = async (req, res) => {
  const { CategoryName } = req.body;
  if (!CategoryName)
    return res.status(400).json({ error: "CategoryName required" });
  await Category.create(CategoryName);
  res.json({ message: "created" });
};

exports.updateCategory = async (req, res) => {
  await Category.update(req.params.id, req.body.CategoryName);
  res.json({ message: "updated" });
};

exports.deleteCategory = async (req, res) => {
  await Category.remove(req.params.id);
  res.json({ message: "deleted" });
};
