// product.service.js

import { ProductModel } from "../models/product.model.js";

// Instantiate the model
const productModel = new ProductModel();

export class ProductService {
  getAllProducts() {
    return productModel.getAll();
  }

  getProductById(id) {
    const product = productModel.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  createProduct(productData) {
    if (!productData.name || !productData.price) {
      throw new Error("Name and price are required");
    }

    if (productData.price < 0) {
      throw new Error("Price cannot be negative");
    }

    if (productData.stock && productData.stock < 0) {
      throw new Error("stock cannot be negative");
    }

    return productModel.create(productData);
  }

  updateProduct(id, productData) {
    const product = productModel.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (productData.price && productData.price < 0) {
      throw new Error("Price cannot be negative");
    }

    if (productData.stock && productData.stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    return productModel.update(id, productData);
  }

  deleteProduct(id) {
    const product = productModel.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    return productModel.delete(id);
  }

  searchProducts(filters) {
    return productModel.search(
      filters.query,
      filters.category,
      filters.minPrice,
      filters.maxPrice,
      filters.inStock
    );
  }
}
