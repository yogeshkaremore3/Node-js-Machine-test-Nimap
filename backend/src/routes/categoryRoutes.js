const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");

router.get("/", controller.getCategories);
router.post("/", controller.createCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
