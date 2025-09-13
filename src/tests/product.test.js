import supertest from "supertest";
import { jest } from '@jest/globals';

describe("Product API", () => {
  let app;
  let productServiceMock;

  beforeAll(async () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    productServiceMock = {
      getAllProducts: jest.fn(),
      createProduct: jest.fn(),
    };

    await jest.unstable_mockModule("../services/product.service.js", () => ({
      ProductService: jest.fn().mockImplementation(() => productServiceMock),
    }));

    const serverModule = await import("../server.js");
    app = serverModule.app; // Matches named export { app } in server.js
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/products/all-products", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", price: 10, stock: 5 },
        { id: 2, name: "Product 2", price: 20, stock: 10 },
      ];

      productServiceMock.getAllProducts.mockReturnValue(mockProducts);

      const response = await supertest(app).get("/api/products/all-products");

      if (response.status !== 200) {
        console.log("GET /api/products/all-products response:", response.status, response.body);
      }

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(mockProducts.length);
      expect(response.body.data).toEqual(mockProducts);
      expect(productServiceMock.getAllProducts).toHaveBeenCalledTimes(1);
    });

    it("should handle server errors", async () => {
      productServiceMock.getAllProducts.mockImplementation(() => {
        throw new Error("Server error");
      });

      const response = await supertest(app).get("/api/products/all-products");

      if (response.status !== 500) {
        console.log("GET /api/products/all-products error response:", response.status, response.body);
      }

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Failed to retrieve products");
    });
  });

  describe("POST /api/products/create-product", () => {
    it("should create a new product", async () => {
      const newProduct = { name: "New Product", price: 15, stock: 8 };
      const createdProduct = { id: 3, ...newProduct };

      productServiceMock.createProduct.mockReturnValue(createdProduct);

      const response = await supertest(app)
        .post("/api/products/create-product")
        .send(newProduct);

      if (response.status !== 201 || !response.body.data) {
        console.log("POST /api/products/create-product response:", response.status, response.body);
      }

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Product created successfully");
      expect(response.body.data).toEqual(createdProduct);
      expect(productServiceMock.createProduct).toHaveBeenCalledWith(newProduct);
    });

    it("should return 400 for invalid input", async () => {
      const invalidProduct = { name: "Invalid Product" }; // Missing price

      productServiceMock.createProduct.mockImplementation(() => {
        throw new Error("Name and price are required");
      });

      const response = await supertest(app)
        .post("/api/products/create-product")
        .send(invalidProduct);

      if (response.status !== 400) {
        console.log("POST /api/products/create-product invalid input response:", response.status, response.body);
      }

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Failed to create product");
    });
  });
});