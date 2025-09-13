import { ProductService } from "../services/product.service.js";

const productService = new ProductService();

// GET all products
export const getAllProducts = (req, res, next) => {
  try {
    const products = productService.getAllProducts();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    error.statusCode = 500;
    error.message = "Failed to retrieve products";
    next(error);
  }
};

// GET product by ID
export const getProductById = (req, res, next) => {
  try {
    const product = productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      error.statusCode = 404;
    } else {
      error.statusCode = 500;
      error.message = "Failed to retrieve product";
    }
    next(error);
  }
};

// POST create product
export const createProduct = (req, res, next) => {
  try {
    const newProduct = productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    const validationErrors = [
      "Name and price are required",
      "Price cannot be negative",
      "Stock cannot be negative",
    ];

    if (validationErrors.includes(error.message)) {
      error.statusCode = 400;
      error.message = "Failed to create product";
    } else {
      error.statusCode = 500;
      error.message = "Failed to create product";
    }

    next(error);
  }
};

// PUT update product
export const updateProduct = (req, res, next) => {
  try {
    const updatedProduct = productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      error.statusCode = 404;
    } else if (
      error.message === "Price cannot be negative" ||
      error.message === "Stock cannot be negative"
    ) {
      error.statusCode = 400;
    } else {
      error.statusCode = 500;
      error.message = "Failed to update product";
    }
    next(error);
  }
};

// DELETE product
export const deleteProduct = (req, res, next) => {
  try {
    const deletedProduct = productService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      error.statusCode = 404;
    } else {
      error.statusCode = 500;
      error.message = "Failed to delete product";
    }
    next(error);
  }
};

// GET search products
export const searchProducts = (req, res, next) => {
  try {
    const products = productService.searchProducts(req.query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    error.statusCode = 500;
    error.message = "Failed to search products";
    next(error);
  }
};
