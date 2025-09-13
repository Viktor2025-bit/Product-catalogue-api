import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler, notFound } from "./utils/errorHandler.js";
import { productRouter } from "./routes/product.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load Swagger docs
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/products", productRouter);

// Api health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product catalogue api is running",
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Only start server if NOT in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
    console.log(`Api documentation : http://localhost:${port}/api-docs`);
    console.log(`Health check : http://localhost:${port}/health`);
  });
}
