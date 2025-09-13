import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts } from "../controllers/product.controller.js";


export const productRouter = Router()

productRouter.get("/all-products", getAllProducts)

productRouter.get("/search", searchProducts)

productRouter.get("/:id", getProductById)

productRouter.post("/create-product", createProduct)

productRouter.put("/:id", updateProduct)

productRouter.delete("/:id", deleteProduct)