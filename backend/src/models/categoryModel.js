const db = require("../config/db");

exports.getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Category ORDER BY CategoryId DESC"
  );
  return rows;
};

exports.create = async (name) => {
  await db.query("INSERT INTO Category (CategoryName) VALUES (?)", [name]);
};

exports.update = async (id, name) => {
  await db.query("UPDATE Category SET CategoryName=? WHERE CategoryId=?", [
    name,
    id,
  ]);
};

exports.remove = async (id) => {
  await db.query("DELETE FROM Category WHERE CategoryId=?", [id]);
};
