const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//ADD PRODUCT//
router.post("/addProduct", async (req, res) => {
  try {
    const product = new Product({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      description: req.body.description,
    });
    const data = await product.save();
    res.json({
      success: true,
      message: "Your product has been added successfully",
    });
  } catch (err) {}
});


// PRODUCTS LIST..//
router.get("/products", async (req, res) => {
  try {
    const data = await Product.find(); //
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Something went wrong!" });
  }
});

// EDIT PRODUCT
router.put("/editProduct", async (req, res) => {
  const productId = req.query.productId; // Access the product ID from the query parameter
  try {
    const { productName, productPrice, description } = req.body;

    // Check if the product with the given ID exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the product's fields
    existingProduct.productName = productName;
    existingProduct.productPrice = productPrice;
    existingProduct.description = description;

    const updatedProduct = await existingProduct.save();

    res.json({
      success: true,
      message: "Product has been updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//VIEW DETAILS//
router.get("/viewProduct", async (req, res) => {
  const productId = req.query.productId;

  try {
    const data = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Id is required",
      });
    }
    res.json({
      success: true,
      message: "Data fetched successfully.",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
// DELETE PRODUCT
router.delete("/deleteProduct", async (req, res) => {
  const productId = req.query.productId; // Access the product ID from the query parameter

  try {
    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product has been deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
