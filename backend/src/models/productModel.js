const db = require("../config/db");

exports.count = async () => {
  const [[{ count }]] = await db.query("SELECT COUNT(*) AS count FROM Product");
  return count;
};

exports.getPaged = async (size, offset) => {
  const [rows] = await db.query(
    `SELECT p.ProductId, p.ProductName, c.CategoryName, c.CategoryId
     FROM Product p 
     JOIN Category c ON p.CategoryId=c.CategoryId
     ORDER BY p.ProductId DESC
     LIMIT ? OFFSET ?`,
    [size, offset]
  );
  return rows;
};

exports.create = async (name, categoryId) => {
  await db.query("INSERT INTO Product (ProductName, CategoryId) VALUES (?,?)", [
    name,
    categoryId,
  ]);
};

exports.update = async (id, name, categoryId) => {
  await db.query(
    "UPDATE Product SET ProductName=?, CategoryId=? WHERE ProductId=?",
    [name, categoryId, id]
  );
};

exports.remove = async (id) => {
  await db.query("DELETE FROM Product WHERE ProductId=?", [id]);
};
