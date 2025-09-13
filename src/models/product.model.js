// Using an in-memory storage

export class ProductModel {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        stock: 50,
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Smart watch",
        price: 149.99,
        stock: 34,
        description: "Fitness tracker with heart rate",
        category: "Electronics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Coffee maker",
        price: 89.99, // Added missing price
        stock: 65,
        description: "Automatic drip coffee maker with timer",
        category: "Home Appliances",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.nextId = 4;
  }

  // Get all products
  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find((p) => p.id === parseInt(id));
  }

  create(productData) {
    const newProduct = {
      id: this.nextId,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    this.nextId++;
    return newProduct;
  }

  update(id, productData) {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      return null;
    }

    this.products[index] = {
      ...this.products[index],
      ...productData,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((p) => p.id === parseInt(id));
    if (index === -1) {
      return null;
    }

    return this.products.splice(index, 1)[0];
  }

  search(query, category, minPrice, maxPrice, inStock) {
    let results = [...this.products];

    if (query) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      results = results.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice) {
      results = results.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      results = results.filter(
        (product) => product.price <= parseFloat(maxPrice) 
      );
    }

    if (inStock === true || inStock === "true") {
      results = results.filter((product) => product.stock > 0);
    }

    return results;
  }
}
