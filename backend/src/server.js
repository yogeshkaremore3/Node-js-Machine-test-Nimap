const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./utils/db");

const app = express();
app.use(cors());
app.use(express.json());


async function initDB() {
  const createCategoryTable = `
    CREATE TABLE IF NOT EXISTS Category (
      CategoryId INT AUTO_INCREMENT PRIMARY KEY,
      CategoryName VARCHAR(100) NOT NULL
    )
  `;

  const createProductTable = `
    CREATE TABLE IF NOT EXISTS Product (
      ProductId INT AUTO_INCREMENT PRIMARY KEY,
      ProductName VARCHAR(100) NOT NULL,
      CategoryId INT,
      FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId) ON DELETE CASCADE
    )
  `;

  try {
    await db.query(createCategoryTable);
    await db.query(createProductTable);
    console.log("Tables are insured catogory and product...");
  } catch (err) {
    console.error("Error ensuring tables:", err);
  }
}

initDB();


app.get("/api/health", (req, res) => res.json({ ok: true }));


app.get("/api/categories", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM Category ORDER BY CategoryId DESC"
  );
  res.json(rows);
});

app.post("/api/categories", async (req, res) => {
  const { CategoryName } = req.body;
  if (!CategoryName)
    return res.status(400).json({ error: "CategoryName required" });
  await db.query("INSERT INTO Category (CategoryName) VALUES (?)", [
    CategoryName,
  ]);
  res.json({ message: "created" });
});

app.put("/api/categories/:id", async (req, res) => {
  const { CategoryName } = req.body;
  await db.query("UPDATE Category SET CategoryName=? WHERE CategoryId=?", [
    CategoryName,
    req.params.id,
  ]);
  res.json({ message: "updated" });
});

app.delete("/api/categories/:id", async (req, res) => {
  await db.query("DELETE FROM Category WHERE CategoryId=?", [req.params.id]);
  res.json({ message: "deleted" });
});


function toInt(v, d = 1) {
  const n = parseInt(v, 10);
  return Number.isInteger(n) && n > 0 ? n : d;
}

app.get("/api/products", async (req, res) => {
  const page = toInt(req.query.page, 1);
  const size = toInt(req.query.size, 10);
  const offset = (page - 1) * size;
  const [[{ count }]] = await db.query("SELECT COUNT(*) AS count FROM Product");
  const totalPages = Math.max(1, Math.ceil(count / size));
  const [rows] = await db.query(
    `SELECT p.ProductId, p.ProductName, c.CategoryName, c.CategoryId 
     FROM Product p 
     JOIN Category c ON p.CategoryId=c.CategoryId 
     ORDER BY p.ProductId DESC 
     LIMIT ? OFFSET ?`,
    [size, offset]
  );
  res.json({ page, size, totalPages, count, data: rows });
});

app.post("/api/products", async (req, res) => {
  const { ProductName, CategoryId } = req.body;
  await db.query("INSERT INTO Product (ProductName, CategoryId) VALUES (?,?)", [
    ProductName,
    CategoryId,
  ]);
  res.json({ message: "created" });
});

app.put("/api/products/:id", async (req, res) => {
  const { ProductName, CategoryId } = req.body;
  await db.query(
    "UPDATE Product SET ProductName=?, CategoryId=? WHERE ProductId=?",
    [ProductName, CategoryId, req.params.id]
  );
  res.json({ message: "updated" });
});

app.delete("/api/products/:id", async (req, res) => {
  await db.query("DELETE FROM Product WHERE ProductId=?", [req.params.id]);
  res.json({ message: "deleted" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));
